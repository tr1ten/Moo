import {
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Customer from "../../../components/Customer";
import { Link, useRouter, Navigator } from "expo-router";
import { User, useUser } from "../../../providers/UserProvider";
import { getAllSubscriptions } from "../../../services/item";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { BUYER } from "../../../constants/common";
import { BuyerSubscription } from "./MySubscriptions";
import { ListItem } from "@rneui/base";
import { Avatar } from "react-native-elements";
function unique(arr: any[]) {
  // using json
  return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map(
    (item) => JSON.parse(item)
  );

}
function MyCustomer() {
  const router = useRouter();
  const [users,setUsers] = useState<User[]>();
  const [mus] = useAuthState(auth);
  const {user} = useUser();
  useEffect(() => {
    if(!mus?.email) return;
    getAllSubscriptions(mus?.email).then((data) => {
      if(!data) return;
      if(user?.type===BUYER){
          setUsers(unique(data.map((item:BuyerSubscription) => item.item.catalogue?.seller.user)));
      }else{
        setUsers(unique(data.map((item:any) => item.buyer.user)));
      }
    })
  },[]);
  return (
    <FlatList
      data={users}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            router.push("/chatRoom");
            router.setParams(item as any);
          }}
        >
          {ChatUser(item)}
        </TouchableOpacity>
      )}
      keyExtractor={(item, i) => `${i}`}
    />
  );
}

export default MyCustomer;

function ChatUser(item: User) {
  return <ListItem>
    <Avatar rounded source={{
      uri: item?.image ?? "https://cdn-icons-png.flaticon.com/512/9763/9763805.png"

    }} />
    <ListItem.Content>
      <ListItem.Title>{item?.id ?? "Shubh"}</ListItem.Title>
      <ListItem.Subtitle>{item?.location}</ListItem.Subtitle>
    </ListItem.Content>
  </ListItem>;
}

