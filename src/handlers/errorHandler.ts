import TelegramBot from "node-telegram-bot-api";
import logger from "../models/logger.ts";

const errorHandler = (bot: TelegramBot | null, chatId: number | null, action: string, error: Error, shutdown: boolean = false) => {
  logger.error(action, error);
  chatId && bot && bot.sendMessage(chatId, "Something went wrong, please try again later.");
  shutdown && process.exit(1);
};

export { errorHandler };
