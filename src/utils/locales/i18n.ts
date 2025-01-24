import en from "./en.json" with { type: "json" };;
import ru from "./ru.json" with { type: "json" };;

type Params = Record<string, any>;
type Translations = Record<string, string>;

const getText = (lang: string, key: string, params?: Params) => {
  const translations: Translations = lang === "ru" ? ru : en;
  let text = translations[key] || key;

  if (params) {
    text = text.replace(/\{(\w+)\}/g, (_: string, param: string) => {
      return params[param] !== undefined ? String(params[param]) : `{${param}}`;
    });
  }

  return text;
};

export default getText;
