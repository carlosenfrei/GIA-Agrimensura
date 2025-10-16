import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { useEffect, useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { NavigationContainer } from '@react-navigation/native';
import { roomStore } from './src/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/navigation/MainNavigator';

// 👇 ESTA LÍNEA ES FUNDAMENTAL
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded, error] = useFonts({
    'Roboto-ExtraBold': require('./assets/fonts/Roboto-ExtraBold.ttf'),
    'Roboto-BoldItalic': require('./assets/fonts/Roboto-BoldItalic.ttf'),
    'Roboto-Italic': require('./assets/fonts/Roboto-Italic.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  // 👇 Usamos useCallback para asegurarnos de ocultar el splash solo cuando todo esté cargado
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || error) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  // 👇 Si las fuentes no están listas, no renderizamos nada todavía
  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Provider store={roomStore}>
      <NavigationContainer onReady={onLayoutRootView} style={styles.container}>
        <MainNavigator />
        <StatusBar style="auto" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});