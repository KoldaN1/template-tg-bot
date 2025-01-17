import TelegramBot from "node-telegram-bot-api";
import { errorHandler } from "./errorHandler.ts";

const messageHandler = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  try {
    if (!msg.from || msg.from.is_bot) return;
  } catch (error) {
    errorHandler(bot, msg.chat.id, "HANDLERS/MESSAGE", error as Error);
  }
};

export { messageHandler };
