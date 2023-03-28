import { View } from "react-native";
import React from "react";
import { deleteUserItem, Item } from "../services/item";
import { Avatar, ListItem, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";
type Props = {
  item:Item,
  onDeleteItem: (id:string)=>void
}
export const CatalogItem = ({item,onDeleteItem}:Props) => {
  return ( 
    <ListItem>
      <Avatar
        rounded
        source={{ uri: item.type?.image }}
      />
      <ListItem.Content>
        <ListItem.Title>
         {item.type?.label}
        </ListItem.Title>
        
        <ListItem.Subtitle>
            <Text style={{fontWeight:"bold"}}> Capacity</Text> {item.capacity}/day
        </ListItem.Subtitle>
        <ListItem.Subtitle>
            <Text style={{fontWeight:"bold"}}> Price</Text> ₹ {item.price}/item
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron 
        onPress={
          ()=>onDeleteItem(item.id)
        }
        name="delete"
        type='ant'
        size={25}
        color='red' />
    </ListItem>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
});
