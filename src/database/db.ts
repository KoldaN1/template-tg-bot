import logger from "../models/logger.js";
import "dotenv/config";
import * as JSONDB from "./jsonDB.js";
import * as MongoDB from "./mongoDB.js";

const DB_TYPE = process.env.DB_TYPE || "json";

let dbInstance: typeof JSONDB | typeof MongoDB;

switch (DB_TYPE) {
  case "json":
    dbInstance = JSONDB;
    break;
  case "mongodb":
    dbInstance = MongoDB;
    break;
  default:
    logger.error("DB", "Invalid DB_TYPE. Use: json, mongodb.");
    process.exit(1);
}

export default dbInstance;
