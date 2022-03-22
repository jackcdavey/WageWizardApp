import { NavigationContainer } from '@react-navigation/native';
import React, { useState } from 'react';
//import { useFonts } from 'expo-font';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import NavBar from './src/components/NavBar';
import Header from './src/components/Header';
import COLORS from './src/styles/colors.js';
import useFonts from './src/hooks/useFonts.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';



/////////////////// SET CUSTOM FONT USAGE //////////////////////

//Custom fonts display properly in simulators, but trigger errors when run with Expo go.
//To enable or disable custom fonts, set the following value
global.globalCustomFontUse = false;

/////////////////// SET CUSTOM FONT USAGE //////////////////////




const App = () => {
  const [IsReady, SetIsReady] = useState(false);
  const LoadFonts = async() => {
    await useFonts();
  };
  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }
  

  return (
  <NavigationContainer>
      
      {/* Currently, the header is generated inside the NavBar component. This will need to be separated
      to allow for navigation to the iew page  */}
      {/* <Header />
      */}
      <NavBar />
      
      
      <SafeAreaView style={{ backgroundColor: COLORS.primary }}/>
       <View style={{ flexDirection: 'row', flex: 0 }}> 
          {/* <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.active }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} /> */}

      </View> 
    </NavigationContainer>

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
