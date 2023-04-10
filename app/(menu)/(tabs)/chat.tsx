import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Customer from "../../../components/Customer";
import { Link, useRouter, Navigator } from "expo-router";
function MyCustomer() {
  const router = useRouter();
  const arr = [
    {
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
      name: "Pratham Singh",
      dues: 122,
      area: "Faridabad , Haryana",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9763/9763805.png",
      name: "Sushmit Bhalotia",
      dues: 100,
      area: "Jhunjunu ,Rajashan",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/4128/4128176.png",
      name: "Ranjan Mangla",
      dues: 12210,
      area: "bhuna , Hisar",
    },
    {
      image: "https://cdn-icons-png.flaticon.com/512/9763/9763805.png",
      name: "Anshu",
      dues: 12210,
      area: "Delhi",
    },
  ];
  return (
    <FlatList
      data={arr}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            router.push("/chatRoom");
            router.setParams(item as any);
          }}
        >
          <Customer data={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, i) => `${i}`}
    />
  );
}

export default MyCustomer;
