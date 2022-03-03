import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import NavBar from './src/components/NavBar';
import Header from './src/components/Header';
import COLORS from './src/styles/colors.js';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? COLORS.dark : COLORS.primary,
  };

  return (
    <NavigationContainer>

    
      <SafeAreaView style={{backgroundColor: COLORS.primary }}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          {}
        </ScrollView>
      </SafeAreaView>
      
      {/* Currently, the header is generated inside the NavBar component. This will need to be separated
      to allow for navigation to the AccountView page  */}
      {/* <Header /> */}

      <NavBar />
      {/* <View style={{ flexDirection: 'row', flex: 0 }}> 
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.active }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />

      </View> */}
      </NavigationContainer>

  );
};
{/* Somehow pull active tab from NavBar props to set color of bacgrkound of correspondign SafeAreaViewObjects above*/}

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
