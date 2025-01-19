import getText from "../locales/i18n.js";
import * as handlers from "../../handlers/index.js";

const language = (user: any) => {
  try {
    return {
      inline_keyboard: [
        [
          { text: getText(user.languageCode, "language_en_b"), callback_data: `${user.tgId}:langChoose:en` },
          { text: getText(user.languageCode, "language_ru_b"), callback_data: `${user.tgId}:langChoose:ru` },
        ],
      ],
    };
  } catch (error) {
    handlers.errorHandler(null, null, "KEYBOARDS/LANGUAGE", error as Error);
  }
};

export { language };
