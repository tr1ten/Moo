import React, { useEffect, useState } from "react";

import { Text } from "@rneui/themed";
import {
  Item,
  SubscriptionStatus,
  deleteSubscription,
  getAllSubscriptions,
} from "../../../services/item";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase/firebaseConfig";
import { FlatList } from "react-native-gesture-handler";
import SubscriptionItem from "../../../components/Buyer/SubscriptionItem";
import { ToastAndroid } from "react-native";
import { RefreshControl } from "react-native";
import Placeholder from "../../../components/Placeholder";
export type BuyerSubscription = {
  id: number;
  quantity: number;
  createdAt: Date;
  item: Item;
  status: SubscriptionStatus
};
function MySubscriptions() {
  const [subscriptions, setSubs] = useState<BuyerSubscription[]>([]);
  const [loading,setLoading] = useState<boolean>(false);
  const onDelete = async (id: number) => {
    ToastAndroid.show("Cancelling Subscription...", ToastAndroid.SHORT);
    try {
      deleteSubscription(id);
    } catch (e) {
      ToastAndroid.show("Failed to cancel Subscription...", ToastAndroid.SHORT);
      console.log("cancel subs ", e);
      return;
    }
    ToastAndroid.show("Subscription Cancelled!", ToastAndroid.SHORT);
    setSubs(subscriptions.filter(e=>e.id!=id));
  };
  const [user] = useAuthState(auth);
  const updateSubs = async () => {
      if (!user?.email) return;
      setLoading(true);
    const res = await getAllSubscriptions(user?.email);
    setSubs(res);
    // console.log("here your subs", res);
    setLoading(false);

  };
  useEffect(() => {
    updateSubs();
  }, []);
  if(!subscriptions || !subscriptions.length){
    return <Placeholder title="You have no subscriptions!" />
  }
  return (
    <FlatList
    refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={()=>updateSubs()}
        />}
      data={subscriptions}
      keyExtractor={(item, i) => item.id.toString()}
      renderItem={({ item }) => <SubscriptionItem onDelete={onDelete} sub={item} />}
    />
  );
}

export default MySubscriptions;
