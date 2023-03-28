import { View } from "react-native";
import { Button, Card, Input, Text } from "@rneui/themed";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import DropDownPicker from "react-native-dropdown-picker";
import { StyleSheet } from "react-native";
import { getItemTypes } from "../services/common";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { addUserItem, Catalog, Item } from "../services/item";
import { fetchSellerCatalog } from "../services/user";
const AddItemForm = () => {
  const [itemsType, setItemsType] = React.useState(1);
  const [price, setPrice] = React.useState("");
  const [catalogue, setCatalogue] = React.useState<Catalog>();
  const [capacity, setcapacity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [ItemTypes, setItemsTypes] = React.useState([]);
  const [user] = useAuthState(auth);
  const navigate = useRouter();
  const [loading, setLoading] = React.useState(false);
  console.log('---->',ItemTypes,catalogue);
  useEffect(() => {
    getItemTypes()
      .then((res) =>
        setItemsTypes(
          res.map((item: any) => {
            return { label: item.label, value: item.id };
          })
        )
      )
      .catch((err) => console.log(err));
  }, []);
  useEffect(() => {
    fetchSellerCatalog(user?.email!).then((catalog) => setCatalogue(catalog));
  }, []);
  useEffect(() => {
    if (!catalogue) return;
    setItemsTypes(
      ItemTypes.filter((item: any) => {
        return !catalogue.items.find((i: Item) => i.type?.id === item.value);
      })
    );
  }, [catalogue]);
  const onSubmit = async () => {
    setLoading(true);
    if (!user) return;
    if (!ItemTypes || !itemsType || !price || !capacity) return;
    const item: Item = {
      price: parseInt(price),
      capacity: parseInt(capacity),
      itemTypeId: itemsType,
    };
    console.log("Submitting item", item, user.email);
    addUserItem(item, user.email!)
      .then(() => navigate.replace("/MyCatalogue"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <SafeAreaView>
      <Card>
        <Card.Title>Catalogue Item</Card.Title>
        <Card.Divider />
        <View style={styles.container}>
          <Text>Item Type</Text>
          <View style={{ zIndex: 100 }}>
            <DropDownPicker
              items={ItemTypes}
              value={itemsType}
              open={open}
              setOpen={setOpen}
              setValue={setItemsType}
            />
          </View>
          <Text>Price</Text>
          <Input
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
            placeholder="31.0"
          />
          <Text>Capacity</Text>
          <Input
            value={capacity}
            onChangeText={setcapacity}
            keyboardType="numeric"
            placeholder="2"
          />
        </View>
        <Card.Divider />
        <Button loading={loading} onPress={onSubmit} title="Add Item" />
      </Card>
    </SafeAreaView>
  );
};

export default AddItemForm;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    gap: 4,
  },
});
