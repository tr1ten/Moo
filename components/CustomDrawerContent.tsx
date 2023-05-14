import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { ImageBackground } from "react-native";
import { Text,View,Image ,StyleSheet, Pressable} from "react-native";
import Profile from "./Profile";
import { auth } from "../firebase/firebaseConfig";
import React from "react";
import { Icon } from '@rneui/themed';
import { useUser } from "../providers/UserProvider";
import { BUYER, SELLER } from "../constants/common";
import { useTranslation } from "react-i18next";
export default function CustomDrawerConternt(props: any) {
  const { t } = useTranslation();
  const navigation = props.navigation;
  const {user} = useUser();
  
  return (
    <ImageBackground imageStyle={{opacity:.5}} source={require("./../assets/images/background.png")} resizeMode="cover" style={style.img} >
        <DrawerContentScrollView
      contentContainerStyle={{
        justifyContent: "space-between",
      }}
      {...props}
    >
      <Profile {...props} />
      
      <View style={style.welcome}>
        <Text style={style.welcometext}>{user?.name ?? user?.id}</Text>
      </View>
      <DrawerItemList {...props} />
      <View style={style.box}>
        {user?.type.id==SELLER ? <>
        <Pressable  onPress={() => navigation.navigate("MyCatalogue")}>
            <Item
              name={t("common:MyProducts")}
              iname="bag"
            />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("MyCustomers")}>
          <Item
            name={t("common:MyCustomer")}
            iname="user"
          />
        </Pressable>
        </>
        :  <Pressable onPress={() => navigation.navigate("MySubscriptions")}>
        <Item
          name={t("common:MySubscription")}
          iname="user"
        />
      </Pressable>
          
        }
        <Pressable onPress={() => navigation.navigate("ChangePassword")}>
          <Item
            name={t("common:changepassword")}
            iname="key"
          />
        </Pressable>  
        <Pressable onPress={() => navigation.navigate("Setting")}>
          <Item
            name={t("common:Setting")}
            iname="settings"
          />
        </Pressable>
        <Pressable onPress={() => auth.signOut()}>
          <Item
            name={t("common:signout")}
            iname="logout"
          
          />
        </Pressable>

      </View>
      <View style={style.footer}>
        <Image
          style={style.footerimage}
          
          source={require('./../assets/images/nobg.png')}
        />
      </View>
    </DrawerContentScrollView>
      
    </ImageBackground>
    
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
}
,welcome:{
  alignItems:'center',
  justifyContent:'center',
  paddingTop:20
}
,welcometext:{
  fontSize:20,
  fontWeight:'500',
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
 
},
img:{
  height:"100%",
}

})