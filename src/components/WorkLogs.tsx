import React from 'react';
import COLORS from '../styles/colors.js';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  View,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
   alignItems: 'center',
   flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: COLORS.active,
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
  },
  info:{
    fontSize: 20,
  }
});

export default function WorkLogs() {
  return (
    <View style={styles.container}>
      <FlatList
        data={[
          { key: 'Log 1' },
          { key: 'Log 2' },
          { key: 'Log 3' },
          { key: 'Log 4' },
          { key: 'Log 5' },
          { key: 'Log 6' },
          { key: 'Log 7' },
        ]}
        renderItem={({item}) => 
        <View style={styles.item}><Text style={styles.info}>{item.key}</Text></View>}
      />
    </View>
  );
}
