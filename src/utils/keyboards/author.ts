import getText from "../locales/i18n.ts";
import * as handlers from "../../handlers/index.ts";

const author = (user: any) => {
  try {
    return {
      inline_keyboard: [[{ text: getText(user.languageCode, "github_b"), url: "https://github.com/KoldaN1" }], [{ text: getText(user.languageCode, "menu_b"), callback_data: `${user.tgId}:menu` }]],
    };
  } catch (error) {
    handlers.errorHandler(null, null, "KEYBOARDS/AUTHOR", error as Error);
  }
};

export { author };
