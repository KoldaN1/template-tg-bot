import TelegramBot from "node-telegram-bot-api";
import { logger } from "../models/logger.ts";

const errorHandler = (bot: TelegramBot, chatId: number, action: string, error: Error) => {
  logger.error(action, error);
  bot.sendMessage(chatId, "Something went wrong, please try again later.");
};

export { errorHandler };
