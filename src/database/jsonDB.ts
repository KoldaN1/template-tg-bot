import fs from "fs";
import path from "path";
import logger from "../models/logger.js";
import users from "../database/users.json" with { type: "json" };
import "dotenv/config";
import * as handlers from "../handlers/index.js";
import TelegramBot from "node-telegram-bot-api";

const TIME: number = parseInt(process.env.JSON_DB_INTERVAL || "5000");
const DB_NAME: string = process.env.JSON_DB_NAME || "users.json";
const DB_SAVE_NOTIFY: boolean = process.env.JSON_DB_SAVE_NOTIFY === "true" || false;

export const init = async () => {
  try {
    logger.debug("DB", "JSON DB initialized.");
    const dbPath = path.join(import.meta.dirname, DB_NAME);

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
      logger.debug("JSON_DB", "Database not found, created.");
    }

    initCycle();
  } catch (error) {
    handlers.errorHandler(null, null, "JSON_DB", error as Error, true);
  }
};

const initCycle = () => {
  setInterval(async () => {
    try {
      const filePath = path.join(import.meta.dirname, DB_NAME);
      fs.writeFileSync(filePath, JSON.stringify(users, null, "\t"));
      DB_SAVE_NOTIFY && logger.debug("JSON_DB", "Users saved.");
    } catch (error) {
      handlers.errorHandler(null, null, "JSON_DB", error as Error, true);
    }
  }, TIME);
};

export const getUser = async (tgId: number) => {
  try {
    return users.find((user: any) => user.tgId === tgId);
  } catch (error) {
    logger.error("GET_USER", error as Error);
    return null;
  }
};

export const createUser = async (user: any) => {
  try {
    let userDocument = {
      tgId: user.id,
      languageCode: user.language_code,
      createdAt: Date.now(),
    };
    // @ts-ignore
    users.push(userDocument);

    return userDocument;
  } catch (error) {
    logger.error("CREATE_USER", error as Error);
    return null;
  }
};

export const updateUser = async (tgId: number, data: any) => {
  try {
    const user = await getUser(tgId);
    if (user) {
      await Object.assign(user, data);
      return user;
    }
    
    return user;
  } catch (error) {
    logger.error("UPDATE_USER", error as Error);
    return null;
  }
};