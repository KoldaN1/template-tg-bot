import TelegramBot from "node-telegram-bot-api";
import { errorHandler } from "../handlers/errorHandler.ts";
import { getText } from "../utils/locales/i18n.ts";

const start = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  try {
    if (!msg.from || msg.from.is_bot) return;
    const userId = msg.from.id;
    const languageCode = msg.from.language_code || "en";

    return bot.sendMessage(userId, getText(languageCode, "start", { username: msg.from.username }), {
      reply_markup: {
        inline_keyboard: [[{ text: "Author", callback_data: `${userId}:author` }]],
      },
    });
  } catch (error) {
    errorHandler(bot, msg.chat.id, "COMMANDS/START", error as Error);
  }
};

export { start };
