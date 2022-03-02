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
  TouchableOpacity,
  Alert,
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
  label: {
    fontSize: 23,
  },
  infoTxt:{
    fontSize: 50,
  },
  btn:{
    width: Dimensions.get('window').width*0.6,
    height: Dimensions.get('window').width*0.2, 
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
  }
});

export default function MyWage() {
  return (
    <View style={{ 
      flexDirection: 'column',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      }}>
      <Text style={styles.label}>San Jose Minimum Wage:</Text>
      <Text style={styles.infoTxt}>$15.00</Text>
      <View style={styles.infoBox} />          
      <View style={styles.infoBox} />
      <View style={styles.infoBox} />          
      <TouchableOpacity onPress={() => Alert.alert('Navigate to see all work logs')}>
          <View style={styles.btn} />          
        </TouchableOpacity>  
    </View>
  );
}
