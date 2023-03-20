import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View } from "react-native";
import Profile from "./Profile";
import { auth } from "../firebase/firebaseConfig";

export default function CustomDrawerConternt(props: any) {
  const navigation = props.navigation;
  return (
    <DrawerContentScrollView
    contentContainerStyle={{
      justifyContent: "space-between",
      flex: 1,

    }}

    {...props}>
        <Profile />
        <DrawerItemList {...props} />
        <DrawerItem 
            label="My Catalogue"
            icon={() => (
              <Entypo name="shop" size={24} color="black" />
            )}
            onPress={() => navigation.navigate("MyCatalogue")}
        />
        <View 
        >
        <DrawerItem
            label="Setting"
            icon={() => (
              <FontAwesome5 name="cog" size={24} color="black" />
            )}
            onPress={() => navigation.navigate("Setting")}
          />
        <DrawerItem
          label="SignOut"
          icon={() => (
            <FontAwesome5 name="sign-out-alt" size={24} color="black" />
          )}
          onPress={() => auth.signOut()}
        />
        </View>
    </DrawerContentScrollView>
  );
}
