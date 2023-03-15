import { FontAwesome5 } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { View } from "react-native";
import { useAuth } from "../services/auth/provider";

export default function CustomDrawerContent(props: any) {
  const { signOut } = useAuth();
  const navigation = props.navigation;
  return (
    <DrawerContentScrollView

    style={{
      flexDirection: "column-reverse",
    }}
    {...props}>
        <DrawerItemList {...props} />
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
          onPress={() => signOut()}
        />
    </DrawerContentScrollView>
  );
}
