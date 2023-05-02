import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Link, Tabs } from "expo-router";
import { Pressable, useColorScheme } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import TabHeader from "../../../components/TabHeader";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        header: ({ navigation, route }) => (
          <TabHeader
            title={
              route.name === "index"
                ? "Home"
                : route.name === "mycustomer"
                ? "My Customers"
                : "Chat"
            }
            onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
          />
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Entypo name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="mycustomer"
        options={{
          title: "My Customers",
          tabBarIcon: ({ color }) => (
            <Ionicons name="people" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ color }) => (
            <Entypo name="chat" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
