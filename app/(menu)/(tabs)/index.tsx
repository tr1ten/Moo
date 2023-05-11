import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { useFCM } from "../../../services/push_notification";
import { Calendar } from "react-native-calendars";
import { Dialog } from "@rneui/themed";
import React from "react";
import { useUser } from "../../../providers/UserProvider";
import { BUYER } from "../../../constants/common";
import DisplaySellers from "../../../components/Buyer/DisplaySellers";
import { ScrollView } from "react-native-gesture-handler";
import * as Font from "expo-font";
import SellerHome from "../../../components/Seller/SellerHome";

export default function TabTwoScreen() {
  const { user } = useUser();
  if(!user) return;
  console.log("user type ",user);
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
        Greetings {user?.name ?? "Name"} 👋!
      </Text>
        <SellerHome /> 
    </ScrollView>
  );
}

