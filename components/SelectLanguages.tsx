import React, { useEffect, useState } from "react";
import { View, Switch, StyleSheet } from "react-native";
import { useLanguage } from "../providers/LanguageProvider";
import { Text } from "@rneui/themed";
import { useTranslation } from "react-i18next";

const SelectLanguages = () => {
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [isEnglishSelected, setIsEnglishSelected] = useState(language === "en");

  useEffect(() => {
    setIsEnglishSelected(language === "en");
  }, [language]);

  const handleToggleLanguage = (value: boolean) => {
    const selectedLanguage = value ? "en" : "hi";
    setIsEnglishSelected(value);
    changeLanguage(selectedLanguage);
  };

  return (
    <View style={styles.container}>
      {/* <Text style={styles.txt}>{t("common:languageSelector")}</Text> */}
      <Switch value={isEnglishSelected} onValueChange={handleToggleLanguage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    zIndex: 100,
    width: "60%",
    justifyContent: "space-between",

    marginLeft: 50,
  },
  txt: {
    marginTop: 12,
  },
});

export default SelectLanguages;
