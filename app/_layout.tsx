import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';
import { themes } from '@/constants/tailwind-colors';
// import BottomSelect
import { useColorScheme } from 'nativewind';
import { View } from 'react-native';
import ProfileInfo from './ProfileInfo.js';
import _layout from './(main)/_layout';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      {/* <View> */}
      {/* <ProfileInfo /> */}
      <_layout />
      {/* </View> */}
    </ThemeProvider>
  );
}

// <Stack>
// <Stack.Screen
//   name='profile'
//   options={{ title: 'Profile', headerShown: false }}
// />
// {/* <Stack.Screen
//   name='+not-found'
//   options={{ title: 'Profile11', headerShown: false }}
// /> */}
// {/* <Stack.Screen name='(main)' options={{ headerShown: false }} /> */}
// {/* <Stack.Screen
//   name='BottomSelect'
//   options={{ title: 'Profile1', headerShown: false }}
// /> */}
// </Stack>

// <StatusBar style='auto' />
