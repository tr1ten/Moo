import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image, RefreshControl} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import Customer from '../../../components/Customer'
import {Stack,Tabs} from 'expo-router';
import { Link, useRouter,Navigator } from 'expo-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { SubscriptionStatus, getAllSubscriptions } from '../../../services/item';
import { BuyerSubscription } from './MySubscriptions';
import { User } from '../../../providers/UserProvider';
import Placeholder from '../../../components/Placeholder';
import { useIsFocused } from '@react-navigation/native';

export type SellerSubscription = BuyerSubscription & {
   buyer: {
      user: User;
   }

}
function MyCustomer(){
  const router=useRouter();
  const [custs,setCusts] = useState<SellerSubscription[]>([]);
  const [user] = useAuthState(auth);
  const [loading,setLoading] = useState<boolean>(false);
  const updateSubs = async () => {
    if(!user?.email) return;
    getAllSubscriptions(user?.email).then((data)=>{
      if(!data) return;
      setCusts(data.filter((e:SellerSubscription)=>e.status!=SubscriptionStatus.CANCELLED));
  })
  }
  const isFocused = useIsFocused();
  useEffect(()=>{
    updateSubs();
  },[isFocused]);
  if(!custs || !custs.length){
    return <Placeholder title="No Customers available!" />
  }
  return (
    <>
      <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={()=>updateSubs()} />
          }
          data={custs}
          renderItem={({item}) =>
            // <TouchableOpacity onPress={()=>{

            //   // router.push("/customer")
            //   // router.setParams(item as any);
            // }
            // }>
              <Customer data={item} onRefresh={updateSubs} />
            // </TouchableOpacity>
            
          }
          keyExtractor={(item,i) =>`${i}`}
        />
    </>
  )
  
}

export default MyCustomer