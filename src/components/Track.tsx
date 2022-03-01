import React from 'react';

import Map from './Map';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

export default function Tracking() {
  return (
    <View style={styles.container}>
        <Text style={styles.elements}>Timer:   00 : 00</Text>
          <Map />
         <Text style={styles.elements}>Job: Default Job</Text>
         <View style={styles.start} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
 elements:{
    paddingBottom: Dimensions.get('window').height * 0.02,
    paddingTop: Dimensions.get('window').height * 0.02,
    fontSize: 40,
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.35,
  },
  start: {
    width: Dimensions.get('window').height * 0.2,
    height: Dimensions.get('window').height * 0.2,
    borderRadius: Dimensions.get('window').height * 0.2 / 2,
    backgroundColor: "green",
  },
});



