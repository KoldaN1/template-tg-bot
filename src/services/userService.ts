import TelegramBot from "node-telegram-bot-api";
import logger from "../models/logger.js";
import db from "../database/db.js";

export const createUserIfNotExist = async (user: TelegramBot.User) => {
  try {
    let userDocument = await db.getUser(user.id);
    if (!userDocument)
      // @ts-ignore
      userDocument = await db.createUser({
        id: user.id,
        language_code: user.language_code,
      });

    return userDocument;
  } catch (error) {
    logger.error("CREATE_USER_IF_NOT_EXIST", error as Error);
    return null;
  }
};

export const getUser = async (tgId: number) => {
  try {
    return await db.getUser(tgId);
  } catch (error) {
    logger.error("GET_USER", error as Error);
    return null;
  }
};

export const updateUser = async (tgId: number, data: any) => {
  try {
    return await db.updateUser(tgId, data);
  } catch (error) {
    logger.error("UPDATE_USER", error as Error);
    return null;
  }
};
