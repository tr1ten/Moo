import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { DrawerActions } from '@react-navigation/native';
import TabHeader from '../../../components/TabHeader';
import { useUser } from '../../../providers/UserProvider';
import React from 'react';
import { BUYER } from '../../../constants/common';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {user} = useUser();
  if(user?.type==BUYER){
    return (
      <Tabs screenOptions={{
        tabBarShowLabel:false,
        header: ({ navigation,route }) => <TabHeader title={
          route.name === 'index' ? 'Home' : route.name === 'MySubscriptions' ? 'My Subscriptions' : 'Chat'
        } onPress={
          () => navigation.dispatch(DrawerActions.toggleDrawer())
        } />,
      }}>
        <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({color})=><Entypo name="home" size={24} color={color} /> }}/>
      <Tabs.Screen name="MySubscriptions" options={{title:"My Subscriptions", tabBarIcon: ({color})=><MaterialIcons name="payments" size={24} color={color} /> }}/>
        
        <Tabs.Screen name="MyCustomers" options={{
           href:null}}/>
        <Tabs.Screen name="chat" options={{title:"Chat", tabBarIcon: ({color})=><Entypo name="chat" size={24} color={color} /> }}/>
  
      </Tabs>
    )
  }
  return (
    <Tabs screenOptions={{
      tabBarShowLabel:false,
      header: ({ navigation,route }) => <TabHeader title={
        route.name === 'index' ? 'Home' : route.name === 'MyCustomers' ? 'My Customers' : 'Chat'
      } onPress={
        () => navigation.dispatch(DrawerActions.toggleDrawer())
      } />,
    }}>
      <Tabs.Screen name="index" options={{title:"Home", tabBarIcon: ({color})=><Entypo name="home" size={24} color={color} /> }}/>
      <Tabs.Screen name="MyCustomers" options={{title:"My Customers", tabBarIcon: ({color})=><Ionicons name="people" size={24} color={color} /> }}/>
      <Tabs.Screen name="MySubscriptions" options={{
           href:null}}/>
      <Tabs.Screen name="chat" options={{title:"Chat", tabBarIcon: ({color})=><Entypo name="chat" size={24} color={color} /> }}/>

    </Tabs>
  );
}
