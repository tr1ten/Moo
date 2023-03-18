import {StyleSheet, Text,FlatList, TouchableOpacity, View,Image} from 'react-native';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next"
function Customer(prop: { data: {
  image: string | undefined; name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; dues: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; area: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; 
}; }){
    const {t} = useTranslation();
    return (
      <View style={styles.container} >
          <View>
            <Text style={styles.text1}>{prop.data.name}</Text>
            <View style={styles.dues}>
              <Text style={styles.text2}>{t("common:Dues")}</Text>
              <Text style={styles.text3}>{prop.data.dues}</Text>
            </View>
            <View style={styles.area}>
              <Text style={styles.text2}>{t("common:Area")}</Text>
              <Text style={styles.text3}>{prop.data.area}</Text>
            </View>
          </View>
          <View>
            <Image style={styles.image} source={{uri:prop.data.image}}/>
          </View>
      </View>
    )
  }
  const styles = StyleSheet.create({
    
    container: {
      flex:1,
      flexDirection:"row",
      justifyContent:"space-between",
      margin:10,
      backgroundColor: 'white',
      borderRadius:10,
      padding: 10,
      elevation: 20,
      shadowColor: '#52006A'
    },
    text1:{
      margin:5,
      fontSize:20,
      fontWeight:"900",
      color:"black"
    },
    text2:{
      marginLeft:5,
      margin:5,
      fontSize:15,
      fontWeight:"700",
      color:"grey"
    },
    text3:{
      marginLeft:5,
      margin:5,
      fontSize:15,
      fontWeight:"700",
      color:"black"
    },
    dues:{
      flex:1,
      flexDirection:"row"
    },
    area:{
      flex:1,
      flexDirection:"row"
    },
    image:{
      borderRadius:50,
      margin:5,
      width:90,
      height:90
    }
  });
  export default Customer;