import fs from "fs";
import path from "path";
import logger from "../models/logger.ts";
import users from "../database/users.json" with { type: "json" };
import "dotenv/config";
import mongoose from "mongoose";
import * as handlers from "../handlers/index.ts";

/* JSON */
const TIME: number = parseInt(process.env.DB_INTERVAL || "5000");
const DB_NAME: string = process.env.DB_NAME || "users.json";
const DB_SAVE_NOTIFY: boolean = process.env.DB_SAVE_NOTIFY === "true" || false;

export const initJsonDB = () => {
  try {
    const dbPath = path.join(import.meta.dirname, DB_NAME);

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
      logger.debug("JSON_DB", "Database not found, created.");
    }

    initJsonCycle();
  } catch (error) {
    handlers.errorHandler(null, null, "JSON_DB", error as Error, true);
  }
};

const initJsonCycle = () => {
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

/* MongoDB */
const MONGO_URI = process.env.MONGO_URI || "";

export const initMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
  } catch (error) {
    handlers.errorHandler(null, null, "MONGO_DB", error as Error, true);
  }
};

/* PostgreSQL */
