import TelegramBot from "node-telegram-bot-api";
import { errorHandler } from "../handlers/errorHandler.ts";

const author = (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery) => {
  try {
    bot.sendMessage(query.from.id, "Hello!");
  } catch (error) {
    errorHandler(bot, query.from.id, "QUERY_CALLBACKS/AUTHOR", error as Error);
  }
};

export { author };
