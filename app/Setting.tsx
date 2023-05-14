import React, { useState } from "react";
// import LinearGradient from "expo-linear-gradient";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Linking,
  TouchableOpacity,
  Modal,
  ImageBackground,
  TextInput,
} from "react-native";
import { useTheme } from "@rneui/themed";
import { SplashScreen, Stack } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";

import SelectLanguages from "../components/SelectLanguages";
import SelectTheme from "../components/SelectTheme";
import { useTranslation } from "react-i18next";
interface PageProps {
  // Add any necessary props
}

const Page: React.FC<PageProps> = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [value, onChangeText] = React.useState("");
  const { theme, updateTheme } = useTheme();
  const { t } = useTranslation();
  const handleChangeTheme = () => {
    // Code for changing the theme
    // const { theme, updateTheme } = useTheme();
    // const [value, setValue] = useState(theme.mode);
    // const newTheme = value === "light" ? "dark" : "light";
    // setValue(newTheme);
    //setModalVisible(true);
  };

  const handleLanguageChange = () => {
    // Code for changing the language

    setModalVisible2(true);
  };

  const handleContactUs = () => {
    Linking.openURL("mailto:sushmitbhalothia@gmail.com?subject=Feedback");
  };

  const handleSendFeedback = () => {
    // Code for sending feedback
    // console.log("yes");
  };

  const handleReportBug = () => {
    // Code for reporting a bug
    setModalVisible3(true);
  };
  const closeModal = () => {
    setModalVisible(false);
    setModalVisible2(false);
    setModalVisible3(false);
  };

  return (
   <>
   <Stack.Screen options={{
    headerStyle: {
      backgroundColor: theme.mode == "light" ? "#fff" : "#292727",
    },
    headerTintColor: theme.mode == "light" ? "#292727" : "#fff",
   }}  />
    <View
      style={theme.mode == "light" ? styles.container : styles.darkcontainer}
    >
      
      <ImageBackground
        source={
          theme.mode == "light"
            ? require("../assets/images/Frame1.png")
            : require("../assets/images/darkFrame1.png")
        }
        style={styles.card}
      >
        {/* <Text style={styles.cardText}>Settings Card</Text> */}
      </ImageBackground>
      <View
        style={
          theme.mode == "light"
            ? styles.optionsContainer
            : styles.darkoptionsContainer
        }
      >
        <OptionButton2
          title={t("common:ChangeTheme")}
          icon="paint-brush"
          onPress={handleChangeTheme}
          RightSideComponent={<SelectTheme />}
        />
        <OptionButton
          title={t("common:ChangeLang")}
          icon="language"
          onPress={handleLanguageChange}
          // RightSideComponent={<SelectLanguages />}
        />

        <OptionButton
          title={t("common:ContactUs")}
          icon="envelope"
          onPress={handleContactUs}
        />
        <OptionButton
          title={t("common:SendFeed")}
          icon="comments"
          onPress={handleSendFeedback}
        />
        <OptionButton
          title={t("common:Report")}
          icon="bug"
          onPress={handleReportBug}
        />
      </View>
      <Modal visible={isModalVisible2} animationType="slide" transparent>
        <View
          style={
            theme.mode == "light"
              ? styles.modalContainer
              : styles.darkmodalContainer
          }
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>
              {t("common:ChangeLang")}
              </Text>
            <SelectLanguages />
            <Button title={t("common:Close")} onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisible3} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>{t("common:ReportBug")}</Text>
            <Text style={styles.modalText}>
              Our tech team will investigate your issue
            </Text>

            <TextInput
              editable
              multiline
              numberOfLines={1}
              maxLength={40}
              onChangeText={(text) => onChangeText(text)}
              value={value}
              style={{ padding: 10 }}
            />
            <Button title="Send" onPress={closeModal} />
          </View>
        </View>
      </Modal>
    </View>
   </>
  );
};

interface OptionButtonProps {
  title: string;
  icon: string;
  //color:string,
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  icon,
  onPress,
  //color
}) => {
  const { theme, updateTheme } = useTheme();
  const iconColor = theme.mode === "light" ? "black" : "white";
  <Stack.Screen
    name="Setting"
    options={{
      headerTitle: "Setting",
      headerStyle: {
        backgroundColor: theme.mode == "light" ? "black" : "white",
      },
    }}
  />;

  return (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={onPress}
      activeOpacity={0.7} // Adjust the opacity as desired for the press effect
    >
      <FontAwesome name={icon} size={24} color={iconColor} />
      <Text
        style={
          theme.mode == "light"
            ? styles.optionButtonText
            : styles.darkoptionButtonText
        }
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
interface OptionButton2Props {
  title: string;
  icon: string;
  onPress: () => void;
  RightSideComponent: React.ReactNode;
}

const OptionButton2: React.FC<OptionButton2Props> = ({
  title,
  icon,
  onPress,
  RightSideComponent,
}) => {
  const { theme, updateTheme } = useTheme();
  const iconColor = theme.mode === "light" ? "black" : "white";
  return (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <FontAwesome name={icon} size={24} color={iconColor} />
      <Text
        style={
          theme.mode == "light"
            ? styles.optionButtonText
            : styles.darkoptionButtonText
        }
      >
        {title}
      </Text>
      {RightSideComponent}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#dfe0f5",
    // backgroundColor: linearGradient("")
    paddingBottom: 40,
  },
  darkcontainer: {
    flex: 1,
    padding: 0,

    // backgroundColor: linearGradient("")
    paddingBottom: 40,
    backgroundColor: "#525250",
  },
  card: {
    backgroundColor: "blue",
    width: "100%",
    aspectRatio: 1.6,

    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  cardText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  optionsContainer: {
    marginTop: -70,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 4,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginLeft: 30,
    padding: 20,
    backgroundColor: "#fff",
  },
  darkoptionsContainer: {
    marginTop: -70,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 20,
    zIndex: 4,
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    // marginLeft: 30,
    padding: 20,
    backgroundColor: "#292727",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 20,

    // Add hover effect styles
  },
  optionButtonText: {
    marginLeft: 20,
    fontSize: 16,
  },
  darkoptionButtonText: {
    marginLeft: 20,
    fontSize: 16,
    color: "white",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  darkmodalContainer: {
    // backgroundColor: "#2b2b2a",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    margin: 40,

  },
  darkmodalContent: {
    backgroundColor: "#2b2b2a",
    padding: 20,
    borderRadius: 8,
    //alignItems: "center",
    margin: 40,
    alignItems: "flex-start",
    zindex: 4,
  },
  modal: {
    backgroundColor: "#2b2b2a",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    alignSelf: "center",
  },
  modalText: {
    alignSelf: "center",
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    alignSelf: "flex-start",
    marginTop: 10,
  },
});

export default Page;
