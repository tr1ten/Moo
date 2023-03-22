import { View } from "react-native";
import { Button, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";

function CustomerHeaderTitleItem() {
  return (
    <View
      style={{
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
      }}
    >
      <Text> Add Item </Text>
      <Button
        style={{
          width: 50,
          padding: 25,
        }}
      >
        <Text
          style={{
            color: "white",
          }}
        >
          Save
        </Text>
      </Button>
    </View>
  );
}

const AddItemForm = () => {
  const navigation = useNavigation();
  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => <CustomerHeaderTitleItem />,
    });
  });

  return (
    <SafeAreaView>
      <Text>AddItemForm</Text>
    </SafeAreaView>
  );
};

export default AddItemForm;
