import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
//import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import NavBar from './src/components/elements/NavBar';
import Account from './src/components/mainScreens/Account';
import Header from './src/components/elements/Header';
import COLORS from './src/styles/colors.js';
import useFonts from './src/hooks/useFonts.js';
import DetailedLogView from './src/components/mainScreens/DetailedLogView';

import { store } from './src/reduxLogic/store';
import { Provider } from 'react-redux';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupNav from './src/components/setupScreens/SetupNav';



/////////////////// SET CUSTOM FONT USAGE //////////////////////

//Custom fonts display properly in simulators, but trigger errors when run with Expo go.
//To enable or disable custom fonts, set the following value
global.globalCustomFontUse = false;

/////////////////// SET CUSTOM FONT USAGE //////////////////////

const Stack = createNativeStackNavigator();

const App = () => {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async () => {
    await useFonts();
  };
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => { }}
      />
    );
  }


  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={NavBar} options={{ headerShown: false }} />
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
          <Stack.Screen name="Setup" component={SetupNav} options={{ headerShown: false }} />
          <Stack.Screen name="DetailedLog" component={DetailedLogView} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}

/* Somehow pull active tab from NavBar props to set color of bacgrkound of correspondign SafeAreaViewObjects above*/

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
