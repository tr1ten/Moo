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
import { Badge } from 'react-native-elements';
import { getAllSubscriptions } from '../../../services/item';
import { SellerSubscription } from './MyCustomers';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../../firebase/firebaseConfig';


export default function TabLayout() {
  const colorScheme = useColorScheme();
  const {user} = useUser();
  const [newSubs, setNewSubs] = React.useState(0);
  React.useEffect(() => {
    if(!user?.id) return;
    getAllSubscriptions(user?.id).then((data)=>{
      // count subs having status pending
      if(!data) return;
      const count = data.filter((item:SellerSubscription)=>item.status==='pending').length;
      setNewSubs(count);
    });
  }, [user] );
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
      <Tabs.Screen name="MyCustomers" options={{title:"My Customers", tabBarIcon: ({color})=>{
        return <>
        {newSubs ? <Badge status="primary" value={newSubs} containerStyle={{ position: 'relative',bottom:-10,right:-10}}/> : null}
        <Ionicons name="people" size={24} color={color} /> 
        </>;
      }}}/>
      <Tabs.Screen name="MySubscriptions" options={{
           href:null}}/>
      <Tabs.Screen name="chat" options={{title:"Chat", tabBarIcon: ({color})=><Entypo name="chat" size={24} color={color} /> }}/>

    </Tabs>
  );
}
