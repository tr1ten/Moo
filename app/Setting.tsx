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
  const { t } = useTranslation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);
  const [isModalVisible3, setModalVisible3] = useState(false);
  const [value, onChangeText] = React.useState("");

  const handleChangeTheme = () => {
    // Code for changing the theme

    setModalVisible(true);
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
    <View style={styles.container}>
      {/* <LinearGradient
        colors={["#00D2FF", "#72C6EF"]}
        style={styles.container}
      /> */}
      {/* <View style={styles.card}>
        <Text style={styles.cardText}>Settings Card</Text>
      </View> */}
      <ImageBackground
        source={require("../assets/images/Frame1.png")}
        style={styles.card}
      >
        {/* <Text style={styles.cardText}>Settings Card</Text> */}
      </ImageBackground>

      <View style={styles.optionsContainer}>
        <OptionButton
          title={t("common:ChangeTheme")}
          icon="paint-brush"
          onPress={handleChangeTheme}
        />
        <OptionButton
          title={t("common:ChangeLang")}
          icon="language"
          onPress={handleLanguageChange}
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
      <Modal visible={isModalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Theme</Text>
            <Text style={styles.modalText}>Modal content goes here...</Text>

            <SelectTheme />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>

      <Modal visible={isModalVisible2} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Change Language</Text>
            <Text style={styles.modalText}>Modal content goes here...</Text>

            <SelectLanguages />
            <Button title="Close" onPress={closeModal} />
          </View>
        </View>
      </Modal>
      <Modal visible={isModalVisible3} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Report a bug</Text>
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
  );
};

interface OptionButtonProps {
  title: string;
  icon: string;
  onPress: () => void;
}

const OptionButton: React.FC<OptionButtonProps> = ({
  title,
  icon,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={styles.optionButton}
      onPress={onPress}
      activeOpacity={0.7} // Adjust the opacity as desired for the press effect
    >
      <FontAwesome name={icon as any} size={24} color="black" />
      <Text style={styles.optionButtonText}>{title}</Text>
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
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 8,
    //alignItems: "center",
    margin: 40,
    alignItems: "flex-start",
    zindex: 4,
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
