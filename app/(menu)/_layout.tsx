import { FontAwesome } from "@expo/vector-icons";
import { useTheme } from "@rneui/themed";
import { Drawer } from "expo-router/drawer";
const visibleItems = ["HomeScreen", "SettingsScreen", "HelpScreen"];
import React from "react";
import CustomDrawerContent from "../../components/CustomDrawerContent";
export default function Layout() {
  const {theme} = useTheme();
  return (
    <Drawer
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{
          headerShown: false,
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
    </Drawer>
  );
}
