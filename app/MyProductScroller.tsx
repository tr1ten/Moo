import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { useFCM } from "../services/push_notification";
import { Calendar } from "react-native-calendars";
import { Dialog } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { Badge } from "@rneui/base";
import { relative } from "path";
import { useIsFocused } from "@react-navigation/core";
import { useRouter } from "expo-router";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { Catalog } from "../services/item";
import { fetchSellerCatalog } from "../services/user";
import CarouselItem from "../components/Seller/CarouselItem";

const ProductScoller = (props: any) => {
  const [user] = useAuthState(auth);
  const [catalogue, setCatalogue] = React.useState<Catalog>();
  const navigate = useRouter();
  const [refresh, setRefresh] = React.useState(false);
  const onRefresh = () => {
    setRefresh(true);
    if (!user) return;
    fetchSellerCatalog(user.email!).then((catalog) => catalog && setCatalogue(catalog));
    setRefresh(false);
  }
  const isFocused = useIsFocused();
  React.useEffect(() => {
    onRefresh();
  }, [user]);
  React.useEffect(() => {
    if (isFocused) {
      onRefresh();
    }
  },[isFocused]);
  return (
    <>
      <Text
        style={{
          paddingTop: 30,
          paddingLeft: 15,
          fontSize: 30,
          color: "#0d2b42",
          fontWeight: "800",
        }}
      >
        Your Products
      </Text>
      <LinearGradient
        colors={["#EBF0F7", "#e3e2de"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
        <ScrollView
          horizontal
          style={{ paddingVertical: 20, paddingLeft: 20 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          {catalogue ? 
          catalogue.items.map((item,i)=><CarouselItem
          capacity={item.capacity}
          key={i}
          title={item.type?.label}
          image={item.type?.image}
        /> )
          : 
          <Text>No Items yet</Text>
          }
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default ProductScoller;
