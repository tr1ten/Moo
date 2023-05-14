import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { useFCM } from "../services/push_notification";
import { Dialog } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";
import { number } from "yargs";
import { Stat } from "../components/Seller/SellerHome";

type Props = {
  stats: Stat | undefined
}
const SalesStat = ({stats}:Props) => {
  const CarouselItem = ({ title, image }: any) => (
    <View style={{ paddingLeft: 10 }}>
      <View style={styles.img}>
        <View>
          <Text style={styles.InnerTxt}>{title}</Text>
        </View>
        <View>
          <Text style={styles.InnerTxtVal}>{image}</Text>
        </View>
      </View>
    </View>
  );
  const [ratingStars, setRatingStars] = useState<string>("");
  useEffect(() => {
    if(!stats) return;
    let rs = "";
    for (let i = 0; i < stats?.ratings; i++) {
      rs += "⭐";
    }
    if(rs.length === 0) rs = "UnRated";
    setRatingStars(rs);
  },[stats])
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
        Sales Stats
      </Text>
      <LinearGradient
        colors={["#EBF0F7", "#e3e2de"]}
        start={[0.5, 0]}
        end={[0.5, 1]}
      >
        <ScrollView
          horizontal
          style={{ paddingVertical: 20, paddingLeft: 10 }}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        >
          <CarouselItem
            title="Revenue"
            image={`₹ ${stats?.revenue}`}
          />
          <CarouselItem
            title="Current Subscribers"
            image={stats?.subscribers}
            // image={require('../assets/images/cow.jpg')}
          />
          <CarouselItem
            title="Avg. Customer Review"
            image={ratingStars}
            // image={require('../assets/images/cow.jpg')}
          />
        </ScrollView>
      </LinearGradient>
    </>
  );
};

export default SalesStat;

const styles = StyleSheet.create({
  img: {
    width: 160,
    height: 70,
    paddingTop: 10,
    marginRight: 10,
    borderRadius: 20,
    overflow: "hidden",

    fontWeight: "700",
    color: "#093f5c",
    backgroundColor: "#4B6385",
    flex: 1,
    alignItems: "center",
  },
  InnerTxt: {
    fontWeight: "700",
    color: "#ced6d6",
    paddingBottom: 2,
  },
  InnerTxtVal: {
    fontWeight: "300",
    color: "#ffffff",
    fontSize: 28,
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    fontWeight: "bold",
  },
});
