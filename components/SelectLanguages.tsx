// import React, { useEffect, useState } from "react";
// import { View, Switch, StyleSheet } from "react-native";
// import { useLanguage } from "../providers/LanguageProvider";
// import { Text } from "@rneui/themed";
// import { useTranslation } from "react-i18next";

// const SelectLanguages = () => {
//   const { language, changeLanguage } = useLanguage();
//   const { t } = useTranslation();
//   const [isEnglishSelected, setIsEnglishSelected] = useState(language === "en");

//   useEffect(() => {
//     setIsEnglishSelected(language === "en");
//   }, [language]);

//   const handleToggleLanguage = (value: boolean) => {
//     const selectedLanguage = value ? "en" : "hi";
//     setIsEnglishSelected(value);
//     changeLanguage(selectedLanguage);
//   };

//   return (
//     <View style={styles.container}>
//       {/* <Text style={styles.txt}>{t("common:languageSelector")}</Text> */}
//       <Switch value={isEnglishSelected} onValueChange={handleToggleLanguage} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//     zIndex: 100,
//     width: "60%",
//     justifyContent: "space-between",

//     marginLeft: 50,
//   },
//   txt: {
//     marginTop: 12,
//   },
// });

// export default SelectLanguages;

import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import DropDownPicker, { ValueType } from "react-native-dropdown-picker";
import { LANGUAGES, translate } from "../constants/DCSLocalize";
import { StyleSheet } from "react-native";
import { useLanguage } from "../providers/LanguageProvider";
import { useTranslation } from "react-i18next";
const SelectLanguages = () => {
  const [open, setOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();
  const { t } = useTranslation();
  const [value, setValue] = useState(language);
  return (
    <View style={styles.container}>
      <Text style={styles.txt}> {t("common:languageSelector")} </Text>
      <DropDownPicker
        closeAfterSelecting
        closeOnBackPressed
        open={open}
        value={value}
        items={LANGUAGES}
        setOpen={setOpen}
        onChangeValue={changeLanguage as any}
        setValue={setValue}
      />
    </View>
  );
};

export default SelectLanguages;
const styles = StyleSheet.create({
  container: {
    // flexDirection: "row",
    zIndex: 100,
    width: "60%",
    padding:10,
    gap:10,
    justifyContent: "space-between",
    marginBottom: 40,
  },
  txt: {
    marginTop: 12,
  },
});
