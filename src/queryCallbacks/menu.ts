import TelegramBot from "node-telegram-bot-api";
import * as handlers from "../handlers/index.ts";
import * as userService from "../services/userService.ts";
import * as keyboards from "../utils/keyboards/index.ts";
import getText from "../utils/locales/i18n.ts";

const menu = (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery, userWhoClicked: TelegramBot.User, args: string[]) => {
  try {
    const user = await userService.getUser(userWhoClicked.id);
    if (!user) return;

    const text = getText(user.languageCode, "menu", { username: userWhoClicked.username });
    return bot.editMessageText(text, {
      reply_markup: keyboards.menu(user),
      chat_id: userWhoClicked.id,
      message_id: query.message?.message_id,
    });
  } catch (error) {
    handlers.errorHandler(bot, userWhoClicked.id, "QUERY_CALLBACKS/MENU", error as Error);
  }
};

export { menu };
