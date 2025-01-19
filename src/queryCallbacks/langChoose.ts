import TelegramBot from "node-telegram-bot-api";
import * as handlers from "../handlers/index.js";
import * as userService from "../services/userService.js";
import getText from "../utils/locales/i18n.js";
import * as keyboards from "../utils/keyboards/index.js";

const langChoose = (bot: TelegramBot) => async (query: TelegramBot.CallbackQuery, userWhoClicked: TelegramBot.User, args: string[]) => {
  try {
    await userService.updateUser(userWhoClicked.id, { languageCode: args[2] });
    const user = await userService.getUser(userWhoClicked.id);
    if (!user) return;

    const text = getText(user.languageCode, "menu", { username: userWhoClicked.username });
    return bot.editMessageText(text, {
      reply_markup: keyboards.menu(user),
      chat_id: userWhoClicked.id,
      message_id: query.message?.message_id,
    });
  } catch (error) {
    handlers.errorHandler(bot, userWhoClicked.id, "QUERY_CALLBACKS/langChoose", error as Error);
  }
};

export { langChoose };
