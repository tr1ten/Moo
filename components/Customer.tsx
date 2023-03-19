import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useState } from 'react'
import { ListItem } from '@rneui/themed';
import { Avatar } from '@rneui/base';
import { useTranslation } from "react-i18next"
function Customer(prop: { data: {
  image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; dues: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; area: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; 
}; }){
    const {t} = useTranslation();
    return (
      <ListItem bottomDivider>

        <Avatar
          rounded
          source={{ uri:prop.data.image }}
        />
        <ListItem.Content>
          <ListItem.Title>{prop.data.name}</ListItem.Title>
          <ListItem.Subtitle>{prop.data.area}</ListItem.Subtitle>
        </ListItem.Content>
      </ListItem>
    )
  }
  export default Customer;