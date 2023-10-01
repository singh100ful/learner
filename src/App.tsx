/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Button,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  useColorScheme,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {ThemeProvider} from './AppProvider';
import {HomeScreen} from './screens/HomeScreen';
import {SettingScreen} from './screens/SettingScreen';
import {AppNavigation} from './navigation/AppNavigation';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  const [active, setActive] = useState('home');
  return (
    <ThemeProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppNavigation />
      </SafeAreaView>
    </ThemeProvider>
  );
}

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.lighter,
    flex: 1,
  },
  textStyle: {
    fontSize: 32,
  },
});

export default App;
