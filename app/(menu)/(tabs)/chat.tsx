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
          setUsers(data.map((item:BuyerSubscription)=>{
            return item.item.catalogue?.seller?.user;
          }))
      }else{
        setUsers(data.map((item:any)=>{
          return item.buyer.user;
        }))
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
          <Customer data={item} />
        </TouchableOpacity>
      )}
      keyExtractor={(item, i) => `${i}`}
    />
  );
}

export default MyCustomer;
