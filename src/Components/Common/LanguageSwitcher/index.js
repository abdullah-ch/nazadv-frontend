import React from "react";
import { useTranslation } from "react-i18next";

const LanguageSwitcher = () => {
  const { i18n } = useTranslation("common");
  const changLanguage = (lang = "en") => {
    i18n.changeLanguage(lang);
  };
  return (
    <div>
      <button onClick={() => changLanguage("ar")}> Switch to Arabic</button>
      <button onClick={() => changLanguage("en")}> Switch to English</button>
    </div>
  );
};

export default LanguageSwitcher;
