import { Entypo, FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
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
      {...props}
    >
      <Profile {...props} />
      <DrawerItemList {...props} />
      <View>
        <DrawerItem
          label="My Products"
          icon={() => <FontAwesome5 name="archive" size={24} color="black" />}
          onPress={() => navigation.navigate("myproducts")}
        />
        <DrawerItem
          label="My Customers"
          icon={() => <FontAwesome5 name="user" size={24} color="black" />}
          onPress={() => navigation.navigate("mycustomers")}
        />

        <DrawerItem
          label="Change Password"
          icon={() => <MaterialIcons name="security" size={24} color="black" />}
          onPress={() => navigation.navigate("changepassword")}
        />
        <DrawerItem
          label="Setting"
          icon={() => <FontAwesome5 name="cog" size={24} color="black" />}
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
