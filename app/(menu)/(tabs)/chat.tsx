import {
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { User, useUser } from "../../../providers/UserProvider";
import { getAllSubscriptions } from "../../../services/item";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { BUYER } from "../../../constants/common";
import { BuyerSubscription } from "./MySubscriptions";
import ChatUser from "../../../components/Chat/ChatUser";
import Placeholder from "../../../components/Placeholder";
import { useIsFocused } from "@react-navigation/native";
function unique(arr: any[]) {
  // using json
  if(!arr || !(arr instanceof Array)) return [];
  return Array.from(new Set(arr.map((item) => JSON.stringify(item)))).map(
    (item) => JSON.parse(item)
  );

}
function MyCustomer() {
  const router = useRouter();
  const [users,setUsers] = useState<User[]>();
  const [mus] = useAuthState(auth);
  const {user} = useUser();
  const isFocused = useIsFocused();
  
  useEffect(() => {
    if(!mus?.email) return;
    getAllSubscriptions(mus?.email).then((data) => {
      if(!data || !(data instanceof Array)) return;
      if(user?.type.id===BUYER){
          setUsers(unique(data.map((item:BuyerSubscription) => item.item.catalogue?.seller.user)));
      }else{
        setUsers(unique(data.map((item:any) => item.buyer?.user)));
      }
    })
  },[isFocused]);
  if (!users || !users.length) {
    return <Placeholder title="No Chats available!" />;
  }
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
          {<ChatUser {...item} />}
        </TouchableOpacity>
      )}
      keyExtractor={(item, i) => `${i}`}
    />
  );
}

export default MyCustomer;
