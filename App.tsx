import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import NavBar from './src/components/elements/NavBar';
import Account from './src/components/mainScreens/Account';
import useFonts from './src/hooks/useFonts.js';
import DetailedLogView from './src/components/mainScreens/DetailedLogView';

import Testing from './src/components/testing.js';

import { store } from './src/reduxLogic/store';
import { Provider } from 'react-redux';

import * as LocalAuthentication from 'expo-local-authentication';


import { StyleSheet, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupNav from './src/components/setupScreens/SetupNav';

import EStyleSheet from "react-native-extended-stylesheet";
EStyleSheet.build({ $rem: Dimensions.get('window').width / 380 });


//For future implementation of user authentication & biometric usage:
//https://github.com/oblador/react-native-keychain

//Will need to be implemented globally for better text input on Anrdoid/iOS
//https://reactnative.dev/docs/textinput


/////////////////// GLOBAL PRODUCTION TESTING VARIABLES //////////////////////

//Custom fonts display properly in simulators, but trigger errors when run with Expo Go.
global.globalCustomFontUse = true;

//Realm DB has limited compatibility with Expo, so disable it when compiling for Expo Go.
global.globalRealmDBUse = true;

/////////////////// GLOBAL PRODUCTION TESTING VARIABLES //////////////////////

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



  //if (global.globalRealmDBUse) {
  ////if(realm)
  //////if(realm.objects('User').length > 0)
  ////////if(realm.objects('User')[0].usePin==true)
  ////////  return <VerifyPin navigation={navigation} />

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Main" component={NavBar} options={{ headerShown: false }} />
          <Stack.Screen name="Testing" component={Testing} options={{ headerShown: false }} />
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
