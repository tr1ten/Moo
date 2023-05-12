import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Text,View,Image ,StyleSheet, Pressable} from "react-native";
import Profile from "./Profile";
import { auth } from "../firebase/firebaseConfig";
import React from "react";
import { Icon } from '@rneui/themed';
import { useFonts } from "expo-font";
import { useUser } from "../providers/UserProvider";
import { BUYER, SELLER } from "../constants/common";

export default function CustomDrawerConternt(props: any) {
  const navigation = props.navigation;
  const [fontsLoaded] = useFonts({
    'sans': require('./../assets/fonts/ProductSans-Regular.ttf'),
  });
  const {user} = useUser();
  if(!fontsLoaded) return <Text>Loading...</Text>;
  
  return (
    <DrawerContentScrollView
      contentContainerStyle={{
        justifyContent: "space-between",
      }}
      {...props}
    >
      
      <Profile {...props} />
      
      <View style={style.welcome}>
        <Text style={style.welcometext}>HELLO {user?.name ?? user?.id}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={style.box}>
        {user?.type==SELLER ? <>
        <Pressable  onPress={() => navigation.navigate("MyCatalogue")}>
            <Item
              name="My Products"
              iname="bag"
            />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("MyCustomers")}>
          <Item
            name="My Customers"
            iname="user"
          />
        </Pressable>
        </>
        :  <Pressable onPress={() => navigation.navigate("MySubscriptions")}>
        <Item
          name="My Subscriptions"
          iname="user"
        />
      </Pressable>
          
        }
        <Pressable onPress={() => navigation.navigate("ChangePassword")}>
          <Item
            name="Change Password"
            iname="key"
          />
        </Pressable>  
        <Pressable onPress={() => navigation.navigate("Setting")}>
          <Item
            name="Setting"
            iname="settings"
          />
        </Pressable>
        <Pressable onPress={() => auth.signOut()}>
          <Item
            name="SignOut"
            iname="logout"
          
          />
        </Pressable>

      </View>
      <View style={style.footer}>
        <Image
          style={style.footerimage}
          
          source={require('./../assets/images/splash.png')}
        />
      </View>
    </DrawerContentScrollView>
    
  );
}
function Item(props :any){
  return (
      <View style={style.item}>
        <Icon size={20} name={props.iname} type="simple-line-icon"/>
        <Text style={style.text}>{props.name}</Text>
      </View>
  )
}

const style=StyleSheet.create({
item:{
  height:50,
  flexDirection:"row",
  justifyContent:'flex-start',
  alignItems:'center',
  gap:15,
  padding:10,
  paddingLeft:20,
  borderRadius:100,
  margin:5
}
,box:{
  padding:10
}
,text:{
  fontWeight:'400',
  fontSize:15,
  fontFamily:'sans'
}
,welcome:{
  alignItems:'center',
  justifyContent:'center',
  paddingTop:20
}
,welcometext:{
  fontSize:20,
  fontWeight:'500',
  fontFamily:'sans'
}
,footerimage:{
  justifyContent:"center",
  height:200,
  width:250
}
,footer:{
  flexDirection:'row',
  justifyContent:'flex-start',
  alignItems:'center',
 
}

})