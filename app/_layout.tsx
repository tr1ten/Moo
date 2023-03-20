import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider, createTheme } from '@rneui/themed';
import { Provider as LanguageProvider } from '../providers/LanguageProvider';
import { useProtectedRoute } from '../hooks/auth';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase/firebaseConfig';
export default function RootLayout() {
  const [user,loading] = useAuthState(auth);
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
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
  components:{
    Text:{
      style:{
        fontFamily:'System',
        
      }
    },
    Button:{
      color:'primary',
    },
  },
  lightColors:{
    primary: 'blue',
    secondary: '#0ff',
    background: '#fff',
  },
  darkColors:{
    primary: 'blue',
    secondary: '#f1e',
  },
  
  mode:'light',
});



function RootLayoutNav() {
  const [user] = useAuthState(auth);
  useProtectedRoute(user);
  return (
    <>
      <ThemeProvider theme={theme} >
        <LanguageProvider>
        <Stack>
          <Stack.Screen name="(auth)/sign-in" options={{ headerShown: false }} />
          <Stack.Screen name="(menu)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
