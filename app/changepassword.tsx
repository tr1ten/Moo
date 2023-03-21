import { Text } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

import { StyleSheet } from "react-native";
function changepassword() {
  return (
    <View style={style.container}>
      <Text>change the password using firebase hooks</Text>
    </View>
  );
}

export default changepassword;

const style = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    gap: 10,
  },
});
