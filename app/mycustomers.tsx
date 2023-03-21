import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

import { StyleSheet } from "react-native";
function mycustomers() {
  return (
    <View style={style.container}>
      <Text>Gives overview of the dueues of all the customers</Text>
    </View>
  );
}

export default mycustomers;

const style = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    gap: 10,
  },
});
