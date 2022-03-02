import COLORS from '../styles/colors.js';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
  article: {
    width: Dimensions.get('window').width*0.3, 
    height: Dimensions.get('window').width*0.2, 
    margin:25,  
    backgroundColor: COLORS.primary,
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

export default function Resources() {
  return (
    <View style={{ 
      flexDirection: 'row',
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      }}>
        <View>
        <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
          <View style={styles.article} />          
          </TouchableOpacity>
          <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
          <View style={styles.article} />          
          </TouchableOpacity>
        </View>

        <View>
        <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>

        <View style={styles.article} />          
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Alert.alert('Navigate to expanded resource view')}>
        <View style={styles.article} />          
        </TouchableOpacity>
        </View>

       
        
    </View>
  );
}
