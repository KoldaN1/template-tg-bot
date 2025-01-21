import getText from "../locales/i18n.js";
import * as handlers from "../../handlers/index.js";

const menu = (user: any) => {
  try {
    return {
      inline_keyboard: [
        [{ text: getText(user.languageCode, "language_b"), callback_data: `${user.tgId}:langMenu` }],
        [{ text: getText(user.languageCode, "author_b"), callback_data: `${user.tgId}:author` }],
      ],
    };
  } catch (error) {
    handlers.errorHandler(null, null, "KEYBOARDS/MENU", error as Error);
  }
};

export { menu };
