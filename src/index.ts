import TelegramBot from 'node-telegram-bot-api';
import 'dotenv/config';
import { logger } from './models/logger.ts';

const token = process.env.TG_TOKEN;

async function start() {
    try {
        if (!token) return logger.error('TG_TOKEN is not defined in the environment variables.');
        const bot = new TelegramBot(token, { polling: true });

        // Обработчик сообщений
        bot.on('message', (msg) => {
            const chatId = msg.chat.id;
            const text = msg.text;
            bot.sendMessage(chatId, text);
        });
    } catch (error) {
        // Логирование ошибки
        logger.error(error);
    }
}

// Запуск бота
start();
