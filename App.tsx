import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
import AppLoading from 'expo-app-loading';
import NavBar from './src/components/elements/NavBar';
import Account from './src/components/mainScreens/Account';
import useFonts from './src/hooks/useFonts.js';
import DetailedLogView from './src/components/mainScreens/DetailedLogView';

import realm from './src/userData/realm';

import Testing from './src/components/testing.js';

import { store } from './src/reduxLogic/store';
import { Provider } from 'react-redux';

//import * as LocalAuthentication from 'expo-local-authentication';


import { Dimensions, LogBox } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SetupNav from './src/components/setupScreens/SetupNav';

import EStyleSheet from "react-native-extended-stylesheet";
EStyleSheet.build({ $rem: Dimensions.get('window').width / 380 });


LogBox.ignoreLogs(["RCTBridge required dispatch_sync to load RNGestureHandlerModule. This may lead to deadlocks",]);
LogBox.ignoreLogs(["[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",]);



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
  var accountExists = false;

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
          <Stack.Screen name="Testing" component={Testing} options={{ headerShown: false }} />
          <Stack.Screen name="Account" component={Account} options={{ headerShown: false }} />
          <Stack.Screen name="Setup" component={SetupNav} options={{ headerShown: false }} />
          <Stack.Screen name="DetailedLog" component={DetailedLogView} options={{ headerShown: false }} />
          {/* <Stack.Screen name="DetailedLog" options={{ headerShown: false }}>{props => <DetailedLogView logId = 0 {...props} />}</Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  );
}


/* Somehow pull active tab from NavBar props to set color of bacgrkound of correspondign SafeAreaViewObjects above*/


export default App;
