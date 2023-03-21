import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

import { StyleSheet } from "react-native";
function myproducts() {
  return (
    <View style={style.container}>
      <Text>PRODUCTS</Text>
    </View>
  );
}

export default myproducts;

const style = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    gap: 10,
  },
});
