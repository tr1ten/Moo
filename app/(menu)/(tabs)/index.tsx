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
import { useFonts } from "expo-font";
export default function TabTwoScreen() {
  const {user} = useUser();
  const [fontsLoaded] = useFonts({
    'sans': require('./../../../assets/fonts/ProductSans-Bold.ttf'),
  });
  if (!fontsLoaded) { return <Text>Loading...</Text> } 
  else
  {
    return (
      <View>
        <Text style={styles.welcome}>
           Welcome UserName!
        </Text>
        <DisplaySellers></DisplaySellers>
      </View>
    )
  }

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
    fontFamily:'sans',
    fontWeight:'800',
    margin:10,
    color:'#0d2b42',
  }
});
