import { StyleSheet } from "react-native";
import { Text, View, Image, Modal, Pressable, Alert } from "react-native";
import { useState, useEffect } from "react";
import { Button } from "@rneui/themed";
import { useThemeMode } from "@rneui/themed";
import { useTheme } from "@rneui/themed";
import { useFCM } from "../services/push_notification";
import { Calendar } from "react-native-calendars";
import { Dialog } from "@rneui/themed";
import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { LinearGradient } from "expo-linear-gradient";

const MyComponent = (props:any) => {
  const CarouselItem = ({ title, image }:any) => (
      <View style={{marginRight:20 }}>
        <View style={styles.img} >
          <View><Text style={{paddingBottom:5,paddingRight:10,fontWeight:'700',color:"#ced6d6",fontSize:15}}>{title}</Text></View>
          <View><Image source={image} resizeMode="cover" style={{height:50,width:50}}/></View>
        </View>
      </View>
  );
  return (
    <>
    <Text style={{paddingTop:30,paddingLeft:15,fontSize:30,color:"#0d2b42",fontWeight:'800',fontFamily:"Arial"}}>My Products</Text>
    <LinearGradient
        colors={['#fcfbf5', '#e3e2de']}
        start={[0.5, 0]}
        end={[0.5, 1]}
    >
    <ScrollView horizontal style={{paddingVertical:20,paddingLeft:20}}   showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
  >
      <CarouselItem
        title="Eggs"
        image={require('../assets/images/EggsCrousal.png')}
      />
      <CarouselItem
        title="Cow Milk"
        image={require('../assets/images/cowCrousal.png')}
      />
      <CarouselItem
        title="Banana"
        image={require('../assets/images/bananaCrousal.png')}
      />
    </ScrollView>
    </LinearGradient>
    </>
  );
};

export default MyComponent;

const styles = StyleSheet.create({
    img: {
      width: 160,
      height: 70,    
      paddingLeft:10,
      paddingTop:10,
      borderRadius:20,  
      overflow:'hidden',
      backgroundColor:"#656666",
      fontWeight:'700',
      color:"#ced6d6",
      flexDirection: 'row'
    },
    title: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
});