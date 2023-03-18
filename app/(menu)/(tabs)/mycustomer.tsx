import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import Customer from '../../../components/Customer'
import { Link, useRouter,Navigator } from 'expo-router';
function MyCustomer(){
  const router=useRouter();
  const arr=
  [
    {
      image:'https://cdn-icons-png.flaticon.com/512/4128/4128176.png',
      name:"pratham",
      dues:122,
      area:'faridabad'
    },
    {
      image:'https://cdn-icons-png.flaticon.com/512/9763/9763805.png',
      name:"sushmit",
      dues:100,
      area:'jhunjunu'
    }
    ,
    {
      image:'https://cdn-icons-png.flaticon.com/512/4128/4128176.png',
      name:"ranjan",
      dues:12210,
      area:'bhuna'
    }
    ,
    {
      image:'https://cdn-icons-png.flaticon.com/512/9763/9763805.png',
      name:"anshu",
      dues:12210,
      area:'delhi'
    }
    
  ]
  return (
    <FlatList
        data={arr}
        renderItem={({item}) =>
          <TouchableOpacity onPress={()=>{

            router.push("/customer")
            router.setParams(item as any);
          }
          }>
            <Customer data={item}/>
          </TouchableOpacity>
          
        }
        keyExtractor={(item,i) =>`${i}`}
      />
  )
  
}

export default MyCustomer