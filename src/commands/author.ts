import TelegramBot from "node-telegram-bot-api";
import getText from "../utils/locales/i18n.js";
import * as userService from "../services/userService.js";
import * as handlers from "../handlers/index.js";

const author = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  try {
    if (!msg.from || msg.from.is_bot) return;
    const userId = msg.from.id;

    const user = await userService.getUser(userId);
    if (!user) return;

    return bot.sendMessage(userId, getText(user.languageCode, "author", { username: msg.from.username }), {
      parse_mode: "HTML",
    });
  } catch (error) {
    handlers.errorHandler(bot, msg.chat.id, "COMMANDS/AUTHOR", error as Error);
  }
};

export { author };
