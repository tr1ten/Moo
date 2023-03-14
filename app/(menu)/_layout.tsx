import { Drawer } from "expo-router/drawer";
const visibleItems = ["HomeScreen", "SettingsScreen", "HelpScreen"];
import CustomDrawerContent from "../../components/CustomDrawerContent";
export default function Layout() {
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
