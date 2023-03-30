import { View, Text } from "react-native";
import React from "react";
import { deleteUserItem, Item } from "../services/item";
import { FlatList } from "react-native-gesture-handler";
import { CatalogItem } from "./CatalogItem";
import { useRoute } from "@react-navigation/native";
import { useNavigation, useRouter } from "expo-router";
import { RefreshControl } from "react-native";
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
      {items.length == 0 && <Text>No items in catalogue :O</Text>}
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
