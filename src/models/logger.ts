import RecLogger from "reclogger";
import "dotenv/config";

const logger = new RecLogger({
  prefix: process.env.BOT_NAME || "LOG",
  time: true,
  level: true,
  action: true,
  color: true,
  bold: true,
  colors: {
    LOG: "green",
    ERROR: "red",
    WARN: "yellow",
    INFO: "cyan",
    DEBUG: "gray",
    SUCCESS: "green",
  },
  pattern: "[{prefix}] ({time}) ({level}) >> {action} | {text}",
});

export { logger };
