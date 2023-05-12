import { Dialog } from "@rneui/base";
import { Avatar, Button, Card, ListItem, Text } from "@rneui/themed";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Icon, Slider } from "@rneui/themed";
import { auth } from "../../firebase/firebaseConfig";
import { Catalog, subscribeToItem } from "../../services/item";
import { ToastAndroid, View } from "react-native";
import { StyleSheet } from "react-native";
import { color } from "react-native-reanimated";
import { Pressable } from "react-native";
import { Test } from "mocha";
import { User } from "react-native-gifted-chat";
export type Seller = {
  location: string;
  decription: string;
  userId: string;
  user: User;
};
export type ItemType = {
  id: number;
  label: string;
  description: string;
  image: string;
};
export type Item = {
  id: number;
  type: ItemType;
  capacity: number;
  price: number;
  catalogue: Catalog;
};

function SellerItem({
  item,
  onRefresh,
}: {
  item: Item;
  onRefresh: () => void;
}) {
  const [visible, setVisible] = useState(false);
  const [user] = useAuthState(auth);
  const onToggle = () => setVisible(!visible);
  const [quantity, setQuantity] = useState(1);
  const onSubmit = async () => {
    // console.log("Subscribing ",item.id, " By ",user?.email);
    if (!user?.email) {
      return;
    }
    try {
      await subscribeToItem(quantity, item.id, user?.email);
      ToastAndroid.show("Added Subscription!", ToastAndroid.SHORT);
    } catch (e) {
      ToastAndroid.show("Failed to add Subscription...", ToastAndroid.SHORT);
    } finally {
      setVisible(false);
      onRefresh();
    }
  };
  return (
    <View>
      <View style={style.container}>
        <View style={{ marginLeft: 10, marginTop: 10 }}>
          <Avatar
            size={120}
            avatarStyle={{ justifyContent: "center" }}
            source={{ uri: item.type?.image }}
          />
        </View>
        <View style={style.bottom}>
          <View>
            <Text style={style.t1}>{item.type?.label}</Text>
            <Text style={style.t2}>
              Seller {item.catalogue.seller.user.name ?? "Rajesh"}
            </Text>
            <Text style={style.t3}>₹ {item.price} / kg</Text>
          </View>
        </View>
        <View style={style.get}>
          <Pressable onPress={() => onToggle()}>
            <View>
              <Text style={style.t4}>Add Item</Text>
            </View>
          </Pressable>
        </View>
      </View>
      <Dialog
        isVisible={visible}
        onBackdropPress={onToggle}
        overlayStyle={{
          backgroundColor: "white",
        }}
      >
        <Dialog.Title title={item.type.label} />
        <Text>Quantity : {quantity}</Text>
        <Text>Approx Cost : {quantity * item.price} Rs</Text>

        <Slider
          value={quantity}
          onValueChange={setQuantity}
          maximumValue={item.capacity}
          minimumValue={1}
          step={1}
          trackStyle={{ height: 10, backgroundColor: "transparent" }}
          thumbStyle={{ height: 20, width: 20, backgroundColor: "transparent" }}
          thumbProps={{
            children: (
              <Icon
                name="blood-drop"
                type="fontisto"
                size={12}
                reverse
                containerStyle={{ bottom: 12, right: 12 }}
                color="red"
              />
            ),
          }}
        />
        <Dialog.Actions>
          <Dialog.Button title={<Text>Confirm</Text>} onPress={onSubmit} />
          <Dialog.Button title={<Text>Cancel</Text>} onPress={onToggle} />
        </Dialog.Actions>
      </Dialog>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingBottom: 0,
    flexDirection: "column",
    backgroundColor: "white",
    borderRadius: 10,
    width: 150,
    margin: 10,
    gap: 5,
    justifyContent: "space-between",
  },
  bottom: {
    marginLeft: 10,
    gap: 5,
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  t1: {
    fontSize: 15,
    fontWeight: "900",
  },
  t2: {
    fontSize: 12,
    color: "grey",
    fontStyle: "italic",
  },
  t3: {
    fontSize: 15,
    color: "green",
    fontStyle: "normal",
  },
  t4: {
    fontWeight: "900",
    fontSize: 15,
    color: "black",
    fontStyle: "normal",
  },
  get: {
    padding: 3,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    alignItems: "center",
    width: 150,
    justifyContent: "center",
  },
});
export default SellerItem;
