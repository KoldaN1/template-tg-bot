import "dotenv/config";
import mongoose from "mongoose";
import * as handlers from "../handlers/index.js";
import logger from "../models/logger.js";
import User from "../models/User.js";

const MONGO_URL = process.env.MONGO_URL || "";

export const init = async () => {
  try {
    logger.debug("DB", "MongoDB initialized.");
    await mongoose.connect(MONGO_URL);
  } catch (error) {
    handlers.errorHandler(null, null, "MONGO_DB", error as Error, true);
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

export const createUser = async (user: any) => {
  try {
    let userDocument = {
      tgId: user.id,
      languageCode: user.language_code,
      createdAt: Date.now(),
    };

    return await User.create(userDocument);
  } catch (error) {
    logger.error("CREATE_USER", error as Error);
    return null;
  }
};

export const updateUser = async (tgId: number, data: any) => {
  try {
    return await User.findOneAndUpdate({ tgId }, data, { new: true });
  } catch (error) {
    logger.error("UPDATE_USER", error as Error);
    return null;
  }
};
