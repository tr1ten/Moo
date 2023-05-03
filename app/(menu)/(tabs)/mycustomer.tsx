import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import Customer from '../../../components/Customer'
import {Stack,Tabs} from 'expo-router';
import { Link, useRouter,Navigator } from 'expo-router';
function MyCustomer(){
  const router=useRouter();
  const arr=
  [
    {
      eggs:"https://cdn-icons-png.flaticon.com/512/532/532573.png",milk:"https://cdn-icons-png.flaticon.com/512/869/869460.png",ghee:0,
      image:'https://cdn-icons-png.flaticon.com/512/4128/4128176.png',
      name:"Pratham Singh",
      dues:122,
      area:'Faridabad , Haryana'
    },
    {
      eggs:"https://cdn-icons-png.flaticon.com/512/532/532573.png",milk:"https://cdn-icons-png.flaticon.com/512/869/869460.png",ghee:0,
      image:'https://cdn-icons-png.flaticon.com/512/9763/9763805.png',
      name:"Sushmit Bhalotia",
      dues:100,
      area:'Jhunjunu ,Rajashan'
    }
    ,
    {
      eggs:"https://cdn-icons-png.flaticon.com/512/532/532573.png",milk:"https://cdn-icons-png.flaticon.com/512/869/869460.png",ghee:0,
      image:'https://cdn-icons-png.flaticon.com/512/4128/4128176.png',
      name:"Ranjan Mangla",
      dues:12210,
      area:'bhuna , Hisar'
    }
    ,
    {
      eggs:"https://cdn-icons-png.flaticon.com/512/532/532573.png",milk:"https://cdn-icons-png.flaticon.com/512/869/869460.png",ghee:0,
      image:'https://cdn-icons-png.flaticon.com/512/9763/9763805.png',
      name:"Anshu",
      dues:12210,
      area:'Delhi'
    }
    
  ]
  return (
    <>
      <FlatList
          data={arr}
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