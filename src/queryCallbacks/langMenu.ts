import TelegramBot from "node-telegram-bot-api";
import * as handlers from "../handlers/index.ts";
import * as userService from "../services/userService.ts";
import getText from "../utils/locales/i18n.ts";
import * as keyboards from "../utils/keyboards/index.ts";
import { language } from "../commands/language.ts";

const langMenu = (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery, userWhoClicked: TelegramBot.User, args: string[]) => {
  try {
    const user = await userService.getUser(userWhoClicked.id);
    if (!user) return;

    const text = getText(user.languageCode, "language", { language: user.languageCode.toUpperCase() });
    return bot.editMessageText(text, {
      reply_markup: keyboards.language(user),
      chat_id: userWhoClicked.id,
      message_id: query.message?.message_id,
      parse_mode: "HTML",
    });
  } catch (error) {
    handlers.errorHandler(bot, userWhoClicked.id, "QUERY_CALLBACKS/langMenu", error as Error);
  }
};

export { langMenu };
