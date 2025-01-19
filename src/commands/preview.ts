import TelegramBot from "node-telegram-bot-api";
import * as handlers from "../handlers/index.js";

const preview = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  try {
    return bot.sendPhoto(msg.chat.id, "assets/preview.png", { caption: "---" });
  } catch (error) {
    handlers.errorHandler(bot, msg.chat.id, "COMMANDS/PREVIEW", error as Error);
  }
};

export { preview };
