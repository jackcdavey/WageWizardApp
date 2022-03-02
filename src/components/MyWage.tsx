import COLORS from '../styles/colors.js';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  Dimensions,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  infoBox: {
    width: Dimensions.get('window').width*0.9, 
    height: Dimensions.get('window').width*0.2, 
    margin:25,  
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
  },
  item: {
    margin: 25,
    padding: 10,
    backgroundColor: COLORS.active,
    fontSize: 18,
    height: 44,
  },
});

export default function MyWage() {
  return (
    <View style={{ 
      flexDirection: 'column',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      }}>
      <View style={styles.infoBox} />          
      <View style={styles.infoBox} />
      <View style={styles.infoBox} />          
        
    </View>
  );
}
