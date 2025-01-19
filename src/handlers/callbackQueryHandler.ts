import TelegramBot from "node-telegram-bot-api";
import { errorHandler } from "./errorHandler.js";
import * as callbacksQueries from "../queryCallbacks/index.js";
import logger from "../models/logger.js";

const callbackQueryHandler = (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery) => {
  try {
    const user = query.from; // user who clicked the button
    const actionArgs = query.data?.split(":") || []; /* userID:action:args[0]:args[1]... */
    const userOwnButton = actionArgs[0]; // user who sent the message and clicked the button
    const action = actionArgs[1]; // action name

    if (!userOwnButton || parseInt(userOwnButton) !== user.id) {
      return bot.answerCallbackQuery(query.id, {
        text: "You can't use this button",
        show_alert: false,
      });
    }

    const callback = callbacksQueries[action as keyof typeof callbacksQueries];
    if (!callback) {
      logger.debug("HANDLERS/CALLBACK_QUERY", `Callback not found: ${action}`);
      return bot.answerCallbackQuery(query.id, {
        text: "WIP",
        show_alert: false,
      });
    }

    await callback(bot)(query, user, actionArgs);
    await bot.answerCallbackQuery(query.id);
  } catch (error) {
    errorHandler(bot, query.from.id, "HANDLERS/CALLBACK_QUERY", error as Error);
  }
};

export { callbackQueryHandler };
