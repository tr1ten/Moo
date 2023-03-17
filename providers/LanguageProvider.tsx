import React, { useEffect } from "react";
import { getLanguage, setLanguage } from "../constants/DCSLocalize";
type LANG = {
  language: string;
  changeLanguage: (val: string) => void;
};

const LanguageContext = React.createContext<LANG>({
  language: "",
  changeLanguage: () => {},
});

// This hook can be used to access the user info.
export function useLanguage() {
  return React.useContext(LanguageContext);
}

export function Provider(props: any) {
  const [language, setLang] = React.useState(getLanguage());
  useEffect(() => {
    setLanguage(language);
  }, [language]);
  return (
    <LanguageContext.Provider
      value={{
        language,
        changeLanguage: setLang,
      }}
    >
      {props.children}
    </LanguageContext.Provider>
  );
}
