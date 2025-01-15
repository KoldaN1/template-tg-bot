import fs from "fs";
import path from "path";
import { logger } from "../models/logger.ts";

/* JSON */
const JSON_DB_NAME = "users.json";

export const initJsonDB = () => {
  try {
    const dbPath = path.join(import.meta.dirname, JSON_DB_NAME);

    if (!fs.existsSync(dbPath)) {
      fs.writeFileSync(dbPath, JSON.stringify([]));
      logger.debug("JSON_DB", "Database not found, created.");
    }
  } catch (error) {
    logger.error("JSON_DB", error as Error);
    process.exit(1);
  }
};

/* MongoDB */

/* PostgreSQL */
