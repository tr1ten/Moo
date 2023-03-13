import { Drawer } from "expo-router/drawer";
const visibleItems = ['HomeScreen', 'SettingsScreen', 'HelpScreen'];

export default function Layout() {
  return <Drawer
  >
    <Drawer.Screen name="(tabs)" options={
        {
            headerShown:false,
            drawerItemStyle:{
                display:'none'
            }
        }
        
        } /> 
        </Drawer>;
}