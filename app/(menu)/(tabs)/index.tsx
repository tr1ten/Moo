import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { useFCM } from "../../../services/push_notification";
import { Calendar } from "react-native-calendars";
import { Dialog } from "@rneui/themed";
import MyComponent from "../../RenderGraph";
import React from "react";
import { useUser } from "../../../providers/UserProvider";
import { BUYER } from "../../../constants/common";
import DisplaySellers from "../../../components/Buyer/DisplaySellers";
import Scroller from "../../horizontalScroller";
import ProductScroller from "../../MyProductScroller";
import TopScroller from "../../TopCarousal";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";

export default function TabTwoScreen() {
  const marked = {
    // "2023-03-21": { marked: true },
    "2023-05-21": {
      selectedDotColor: "yellow",
    },
    "2023-05-28": {
      marked: true,
      selected: true,
      selectedTextColor: "green",
    },
  };
  const currdate = getcurrdate();
  const { user } = useUser();
  function getcurrdate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, "0");
    const mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    const yyyy = today.getFullYear();
    const curr = yyyy + "-" + mm + "-" + dd;
    return curr;
  }
  const [popup, vis] = useState(true);
  const [markedates, changemdates] = useState(marked);
  const [modalVisible, setModalVisible] = useState(false);


  const CalenderModal = ({ visible }) => {
    return (
      <View style={styles.centeredView}>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                This will give overview of all the transaction on this day
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Hide Modal</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };
  if (user?.type == BUYER) {
    return (
      <View>
        <Text>Welcome UserName!</Text>
        <DisplaySellers></DisplaySellers>
      </View>
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#fcfbf5" }}>
      <Text
        style={{
          fontSize: 30,
          color: "#84aac4",
          paddingLeft: 15,
          paddingBottom: 20,
          paddingTop: 20,
          fontWeight: "bold",
        }}
      >
        Greetings Jai 👋!
      </Text>

      <TopScroller />
      <Scroller />
      <CalenderModal visible={false}></CalenderModal>
      <Calendar
        initialDate="2023-5-1"
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedates}
        onDayPress={(day) => {
          setModalVisible(true);
        }}
      />
      <MyComponent text="Weekly Sales" />
      <ProductScroller />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  item: {
    marginRight: 20,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: "cover",
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
