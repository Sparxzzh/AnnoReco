/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect, useState, useCallback} from 'react';
import {DeviceEventEmitter, StyleSheet} from 'react-native';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNav from './src/navigator/AppNav';
import ThemeService from './src/services/ThemeService';

const themeService = new ThemeService();

const App = () => {
  const [theme, setTheme] = useState(null);

  const getAppTheme = useCallback(
    (primary) => {
      const Theme = DefaultTheme;
      return {
        ...Theme,
        colors: {
          ...Theme.colors,
          primary: primary,
        },
      };
    },
    [],
  );

  const getTheme = useCallback(() => {
    themeService.getTheme().then((data) => {
      console.log(data);
      setTheme(getAppTheme(data));
    });
  }, [getAppTheme]);

  useEffect(() => {
    getTheme();
    const listener = DeviceEventEmitter.addListener('THEME_CHANGED', getTheme);
    return () => {
      listener && listener.remove();
    };
  }, [getTheme]);

  if (!theme) {
    return null;
  }
  console.log(theme)

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={theme}>
        <AppNav />
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
