import TelegramBot from "node-telegram-bot-api";
import User from "../models/User.ts";
import logger from "../models/logger.ts";

export const createUserIfNotExist = async (user: TelegramBot.User) => {
  try {
    let userDocument = await User.findOne({ tgId: user.id });
    if (!userDocument) userDocument = await User.create({ tgId: user.id, languageCode: user.language_code || "en" });

    return userDocument;
  } catch (error) {
    logger.error("CREATE_USER_IF_NOT_EXIST", error as Error);
    return null;
  }
};

export const getUser = async (tgId: number) => {
  try {
    return await User.findOne({ tgId });
  } catch (error) {
    logger.error("GET_USER", error as Error);
    return null;
  }
};
