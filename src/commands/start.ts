import TelegramBot from "node-telegram-bot-api";
import getText from "../utils/locales/i18n.ts";
import * as userService from "../services/userService.ts";
import * as handlers from "../handlers/index.ts";
import * as keyboards from "../utils/keyboards/index.ts";

const start = (bot: TelegramBot) => async (msg: TelegramBot.Message) => {
  try {
    if (!msg.from || msg.from.is_bot) return;
    const userId = msg.from.id;

    /* Create user plus first choose language */
    let user = await userService.getUser(userId);
    if (!user) {
      user = await userService.createUserIfNotExist(msg.from);
      if (!user) throw new Error("Failed to create user");

      return bot.sendMessage(
        userId,
        `${msg.from.first_name} 🖐\n\n` +
          getText(user.languageCode, "language", {
            language: user.languageCode.toUpperCase(),
          }),
        {
          reply_markup: keyboards.language(user),
          parse_mode: "HTML",
        }
      );
    }
    /* --- */

    return bot.sendMessage(userId, getText(user.languageCode, "menu", { username: msg.from.username }), {
      reply_markup: keyboards.menu(user),
    });
  } catch (error) {
    handlers.errorHandler(bot, msg.chat.id, "COMMANDS/START", error as Error);
  }
};

export { start };
