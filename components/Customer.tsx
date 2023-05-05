import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { useTranslation } from "react-i18next"
import { User } from '../providers/UserProvider';
import { Seller } from './Buyer/SellerItem';
import { useRouter } from 'expo-router';
function Customer(prop: { data: User  }){
    const {t} = useTranslation();
    const router = useRouter();
    return (
      <ListItem bottomDivider>

        <Avatar
          rounded
          source={{ uri:prop.data?.image ?? "https://cdn-icons-png.flaticon.com/512/9763/9763805.png" }}
        />
        <ListItem.Content>
          <ListItem.Title>{ prop.data.id ??  "Shubh"}</ListItem.Title>
          <ListItem.Subtitle>{prop.data.location}</ListItem.Subtitle>
          <ListItem.Subtitle> Paid: XX</ListItem.Subtitle>
        </ListItem.Content>
        <ListItem.Chevron 
          name='message'
          size={24}
          onPress={
            () => {
                router.push("/chatRoom");
                router.setParams(prop.data as any);
              }          
          }
        />
      </ListItem>
    )
  }
  export default Customer;