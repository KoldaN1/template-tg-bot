import TelegramBot from "node-telegram-bot-api";
import "dotenv/config";
import { logger } from "./models/logger.ts";
import * as commands from "./commands/index.ts";
import * as handlers from "./handlers/index.ts";

const token = process.env.TG_TOKEN;
if (!token) {
  logger.error("TG_TOKEN", "Missing token. Create .env file with TG_TOKEN");
  process.exit(1);
}

const bot = new TelegramBot(token, { polling: true });

const initializeListeners = () => {
  /* Commands */
  bot.onText(/\/start$/i, commands.start(bot));

  /* Handlers */
  bot.on("callback_query", (query: TelegramBot.CallbackQuery) => handlers.callbackQueryHandler(bot)(query));
  bot.on("message", (msg: TelegramBot.Message) => handlers.messageHandler(bot)(msg));
};

initializeListeners();
