import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useEffect, useState } from 'react'
import { useTranslation } from "react-i18next";
import Customer from '../../../components/Customer'
import {Stack,Tabs} from 'expo-router';
import { Link, useRouter,Navigator } from 'expo-router';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig';
import { getAllSubscriptions } from '../../../services/item';
function MyCustomer(){
  const router=useRouter();
  const [custs,setCusts] = useState();
  const [user] = useAuthState(auth);
  useEffect(()=>{
    if(!user?.email) return;
    getAllSubscriptions(user?.email).then((data)=>{
        if(!data) return;
        setCusts(data.map((sub:any)=>{
            return sub.buyer?.user;
        }))
    })
  },[])
  return (
    <>
      <FlatList
          data={custs}
          renderItem={({item}) =>
            <TouchableOpacity onPress={()=>{

              router.push("/customer")
              router.setParams(item as any);
            }
            }>
              <Customer data={item} />
            </TouchableOpacity>
            
          }
          keyExtractor={(item,i) =>`${i}`}
        />
    </>
  )
  
}

export default MyCustomer