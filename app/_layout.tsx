import FontAwesome from "@expo/vector-icons/FontAwesome";
import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { ThemeProvider, createTheme, Text, Button } from "@rneui/themed";
import { Provider as LanguageProvider } from "../providers/LanguageProvider";
import { useProtectedRoute } from "../hooks/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/firebaseConfig";
import { View } from "react-native";
import { useTheme } from "@rneui/themed";
import React from "react";
import { Provider as UserProvider } from "../providers/UserProvider";
import { useTranslation } from "react-i18next";
export default function RootLayout() {
  const [user, loading] = useAuthState(auth);
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    sans: require("./../assets/fonts/ProductSans-Regular.ttf"),
    ...FontAwesome.font,
  });
  return (
    <>
      {(!loaded || loading) && <SplashScreen />}
      {loaded && !loading && <RootLayoutNav />}
    </>
  );
}

const theme = createTheme({
  components: {
    Text: {
      style: {
        fontFamily: "sans",
      },
    },
    Button: {
      style: {
        backgroundColor: "primary",
      },
    },
  },
  lightColors: {
    primary: "blue",
    secondary: "#0ff",
    background: "#fff",
  },
  darkColors: {
    primary: "blue",
    secondary: "#f1e",
  },

  mode: "light",
});
// save button at right side of header

function RootLayoutNav() {
  const { t } = useTranslation();
  const [user] = useAuthState(auth);
  // const { theme, updateTheme } = useTheme();
  useProtectedRoute(user);
  return (
    <>
      <ThemeProvider theme={theme}>
        <LanguageProvider>
          <UserProvider>
            <Stack>
              <Stack.Screen
                name="(auth)/sign-in"
                options={{ headerShown: false }}
              />
              <Stack.Screen name="(menu)" options={{ headerShown: false }} />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="AddItemModal"
                options={{
                  headerTitle: "Add Item",
                }}
              />
              <Stack.Screen
                name="MyCatalogue"
                options={{
                  headerTitle: "My Catalogue",
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                options={{
                  headerTitle: "Change Password",
                }}
              />
              <Stack.Screen
                name="Editprofile"
                options={{
                  headerTitle: "Edit Profile",
                }}
              />
            </Stack>
          </UserProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
