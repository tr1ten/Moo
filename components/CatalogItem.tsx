import { View } from "react-native";
import React from "react";
import { Item } from "../services/item";
import { Avatar, ListItem, Text } from "@rneui/themed";
import { StyleSheet } from "react-native";

export const CatalogItem = (item: Item) => {
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
            <Text style={{fontWeight:"bold"}}> Capacity</Text> {item.capacity}
        </ListItem.Subtitle>
        <ListItem.Subtitle>
            <Text style={{fontWeight:"bold"}}> Price</Text> ₹ {item.price}
        </ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron 
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
