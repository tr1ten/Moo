import { FontAwesome5 } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from "@react-navigation/drawer";
import { useAuth } from "../services/auth/provider";


export default function CustomDrawerContent(props:any) {
  
  const { signOut } = useAuth();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="SignOut"
        icon={() => 
          <FontAwesome5 name="sign-out-alt" size={24} color="black" />
        }
        onPress={()=>signOut()}
      />
    </DrawerContentScrollView>
  );
}
