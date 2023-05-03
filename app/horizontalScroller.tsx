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
import { LinearGradient } from 'expo-linear-gradient';

const MyComponent = (props:any) => {
  const CarouselItem = ({ title, image }:any) => (
      <View style={{paddingLeft:10}}>
        <View style={styles.img} >
          <View><Text style={styles.InnerTxt}>{title}</Text></View>
          <View><Text style={styles.InnerTxtVal}>{image}</Text></View>
        </View>
        
      </View>
  );
  return (
    <>
    <Text style={{paddingTop:30,paddingLeft:15,fontSize:30,color:"#0d2b42",fontWeight:'800',fontFamily:"Arial"}}>Sales Stats</Text>
    <LinearGradient
        colors={['#fcfbf5', '#e3e2de']}
        start={[0.5, 0]}
        end={[0.5, 1]}
    >
    <ScrollView horizontal style={{paddingVertical:20,paddingLeft:10}}   showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}
  >
          <CarouselItem
            title="Last Month Sales"
            // image={require('../assets/images/cow.jpg')}
            image="1540 Lit."
          />
          <CarouselItem
            title="Last Month Profit"
            image="$ 4500"
            // image={require('../assets/images/cow.jpg')}
          />
          <CarouselItem
            title="Coustmer Review"
            image="⭐⭐⭐⭐⭐"
            // image={require('../assets/images/cow.jpg')}
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
      paddingTop:10,
      borderRadius:20,  
      overflow:'hidden',
      backgroundColor:"#656666",
      fontWeight:'700',
      color:"#093f5c",
      flex:1,
      alignItems:"center"
    },
    InnerTxt:{
      fontWeight:'700',
      color:"#ced6d6",
      paddingBottom:2,
    },
    InnerTxtVal:{
      fontWeight:'300',
      color:"#ffffff",
      fontSize:28,
      fontFamily:"Times New Roman"
    },
    title: {
      marginTop: 10,
      fontSize: 18,
      fontWeight: 'bold',
    },
});