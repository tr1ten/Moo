import { View } from "react-native";
import React from "react";
import { deleteUserItem, Item } from "../services/item";
import { FlatList } from "react-native-gesture-handler";
import { CatalogItem } from "./CatalogItem";
import {  useRouter } from "expo-router";
import { Text } from "@rneui/themed";
import { RefreshControl } from "react-native";
import Placeholder from "./Placeholder";
type Props = {
  ditems: Item[];
  onRefresh: () => void;
  refreshing: boolean;
};
const ShowCatalogue = ({ ditems, onRefresh, refreshing }: Props) => {
  const [items, setItems] = React.useState<Item[]>([]);
  const navigate = useRouter();
  const onDeleteItem = (id: string) => {
    setItems(items.filter((item) => item.id != id));
    deleteUserItem(id);
  };
  const onEditHandler = (id: string) => {
    navigate.push("/AddItemModal?id=" + id);
  };
  React.useEffect(() => {
    setItems(ditems);
  }, [ditems]);
  return (
    <View>
      {items.length == 0 && <Placeholder title="No items in catalogue :O" />}
      {items.length > 0 && (
        <FlatList
          refreshControl={
            onRefresh && (
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            )
          }
          data={items}
          renderItem={({ item }) => (
            <CatalogItem
              onEditHandler={onEditHandler}
              onDeleteItem={onDeleteItem}
              item={item}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      )}
    </View>
  );
};

export default ShowCatalogue;
