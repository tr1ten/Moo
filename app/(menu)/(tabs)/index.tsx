import { StyleSheet } from "react-native";
import { View } from "react-native";
import { Text } from "@rneui/themed";
import React from "react";
import { useUser } from "../../../providers/UserProvider";
import { BUYER } from "../../../constants/common";
import DisplaySellers from "../../../components/Buyer/DisplaySellers";
import { ScrollView } from "react-native-gesture-handler";
import SellerHome from "../../../components/Seller/SellerHome";

export default function TabTwoScreen() {
  const { user } = useUser();
  if(!user) return;
  if (user?.type.id == BUYER) {
    return (
      <View>
        <Text style={styles.welcome}>
           Greetings {user.name ?? user.id} 👋!
        </Text>
        <DisplaySellers />
      </View>
    );
  }
  return (
    <ScrollView style={{ backgroundColor: "#fcfbf5" }}>
      <Text
        style={styles.welcome}
      >
        Greetings {user?.name ?? "Name"} 👋!
      </Text>
        <SellerHome /> 
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
  welcome:{
    fontSize: 30,
    color: "#84aac4",
    paddingLeft: 15,
    paddingBottom: 20,
    paddingTop: 20,
    fontWeight: "bold",
    fontFamily: "sans",
  }
});
