import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs screenOptions={{
      tabBarShowLabel:false,
    }}>
      <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({color})=><Entypo name="home" size={24} color={color} /> }}/>
      <Tabs.Screen name="chat" options={{title:"Chat", tabBarIcon: ({color})=><Entypo name="chat" size={24} color={color} /> }}/>
      <Tabs.Screen name="mycustomers" options={{title:"My Customers", tabBarIcon: ({color})=><Ionicons name="people" size={24} color={color} /> }}/>

    </Tabs>
  );
}
