import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { ThemeProvider, createTheme } from '@rneui/themed';
export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });
  return (
    <>
      {!loaded && <SplashScreen />}
      {loaded && <RootLayoutNav />}
    </>
  );
}

const theme = createTheme({
  components:{
    Text:{
      style:{
        fontFamily:'SpaceMono',
        
      }
    },
    Button:{
      color:'primary',
    },
  },
  lightColors:{
    primary: '#f0f',
    secondary: '#0ff',
    background: '#fff',
  },
  darkColors:{
    primary: '#1ef',
    secondary: '#f1e',
  },
  
  mode:'light',
});


function RootLayoutNav() {

  return (
    <>
      <ThemeProvider theme={theme} >
        <Stack>
          <Stack.Screen name="(menu)" options={{ headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
      </ThemeProvider>
    </>
  );
}
