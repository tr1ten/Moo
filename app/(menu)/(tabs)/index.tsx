import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";

import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
//import { Text } from '@rneui/themed';
import { useFCM } from "../../../services/push_notification";
import { Calendar } from "react-native-calendars";
import { Dialog } from "@rneui/themed";

import React from "react";
import { useUser } from "../../../providers/UserProvider";
import { BUYER } from "../../../constants/common";
import DisplaySellers from "../../../components/Buyer/DisplaySellers";

export default function TabTwoScreen() {
  const marked = {
    "2023-03-20": { marked: true },
    "2023-03-1": {
      selected: true,
      selectedColor: "white",
      selectedTextColor: "red",
    },
    "2023-03-18": {
      marked: true,
      selected: true,
      selectedTextColor: "green",
    },
  };
  const currdate = getcurrdate();
  const {user} = useUser();
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
    //setModalVisible(visible);
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
  if(user?.type==BUYER){
    return (
      <View>
        <Text style={styles.welcome}>
           Welcome {user.name ?? user.id}
        </Text>
        <DisplaySellers></DisplaySellers>
      </View>
    )
  }
  return (
    <View>
      <CalenderModal visible={false}></CalenderModal>
      <Calendar
        initialDate="2023-3-1"
        disableAllTouchEventsForDisabledDays={true}
        markedDates={markedates}
        onDayPress={(day) => {
          setModalVisible(true);
        }}
      />
    </View>
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
  welcome:{
    fontSize:25,
//     fontFamily:'sans',
    fontWeight:'800',
    margin:10,
    color:'#0d2b42',
  }
});
