import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import COLORS from '../styles/colors.js';

export default function Map() {
  return (
        <MapView 
        style={styles.map}
        initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }} 
      />
  );
}

const styles = StyleSheet.create({
    map: {
      borderRadius: 15,
      borderColor: COLORS.dark,
      borderWidth: 2,
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').height * 0.35,
    },
  });
  