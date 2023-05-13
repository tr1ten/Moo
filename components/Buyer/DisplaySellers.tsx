import React, { useEffect, useState } from "react";
import { Text } from "@rneui/themed";
import { getNearbySellerItems } from "../../services/user";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig";
import {
  FlatList,
} from "react-native-gesture-handler";
import SellerItem, { Item } from "./SellerItem";
import { useIsFocused } from "@react-navigation/native";
import { Pressable, SafeAreaView, View } from "react-native";
import { StyleSheet } from "react-native";
function DisplaySellers() {
    const[cat,cncat]=useState({
      "Eggs":true,
      "Cow Milk":true,
      "Goat Milk":true,
      "Buffalo Milk":true,
    })
    const [sellerItems, setsellerItems] = React.useState<Item[]>([]);
    const [loading, setLoading] = React.useState(false);
    const [user] = useAuthState(auth);
    const isFocused = useIsFocused();
    const fetchSeller = async () => {
        setLoading(true);
        if(!user?.email) return;
        const items = await getNearbySellerItems(user?.email);
        setsellerItems(items);
        if(setLoading) setLoading(false);
    }
    useEffect(() => {
        // fetch sellers
        fetchSeller();
    },[isFocused]);
    function cow(){
      cncat({...cat,'Cow Milk':!cat["Cow Milk"]})
    }
    function buffalo(){
      cncat({...cat,'Buffalo Milk':!cat["Buffalo Milk"]})
    }
    function eggs(){
      cncat({...cat,'Eggs':!cat["Eggs"]})
      
    }
    function goat(){
      cncat({...cat,'Goat Milk':!cat["Goat Milk"]})
    }
if(loading) return <Text>Loading data...</Text>;
  return (
    <>
    <View style={style.category}>
      <Pressable onPress={()=>eggs()}><Text style={style.cat}>Eggs</Text></Pressable>
      <Pressable onPress={()=>cow()}><Text style={style.cat}>Cow</Text></Pressable>
      <Pressable onPress={()=>goat()}><Text style={style.cat}>Goat</Text></Pressable>
      <Pressable onPress={()=>buffalo()}><Text style={style.cat}>Buffalo</Text></Pressable>
    </View>
    <SafeAreaView>
        {sellerItems ?   <FlatList
        contentContainerStyle={
          {
            paddingBottom:500
          }
        }
        data={sellerItems}
        renderItem={({ item, index }) => {
          if (cat[item.type.label]==true) {
            return <SellerItem onRefresh={fetchSeller} item={item} />
          }
          else{
            return <></>
          }
          }}
        numColumns={2}
     />
        : 
        <Text>No Sellers Found</Text>
        }
    </SafeAreaView>
    </>
  )
  
}
const style=StyleSheet.create({
  category:{
    flexDirection:'row',
    justifyContent:'space-around'
  }
  ,cat:{
    backgroundColor:"white",
    padding:5,
    paddingLeft:20,
    paddingRight:20,
    borderWidth:2,
    borderRadius:20,
    fontSize:15,
    fontWeight:'700'
  }
})
export default DisplaySellers;