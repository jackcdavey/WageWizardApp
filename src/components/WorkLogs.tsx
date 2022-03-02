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
} from 'react-native';

const styles = StyleSheet.create({
  container: {
   alignItems: 'center',
   flex: 1,
  },
  item: {
    margin: 25,
    padding: 10,
    backgroundColor: COLORS.active,
    fontSize: 18,
    height: 44,
  },
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
        <Text style={styles.item}>{item.key}</Text>}
      />
    </View>
  );
}
