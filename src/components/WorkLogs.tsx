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
  TouchableOpacity,
  Alert,
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
          { key: 'Job 1' },
          { key: 'Job 2' },
          { key: 'Job 3' },
          { key: 'Job 4' },
          { key: 'Job 5' },
          { key: 'Job 6' },
          { key: 'Job 7' },
        ]}
        renderItem={({item}) => 
        <TouchableOpacity onPress={() => Alert.alert('This will navigate to the ' + item.key + ' detailed work log')}>
          <View style={styles.item}>
            <Text style={styles.info}>{item.key}</Text>
          </View>
        </TouchableOpacity>}
      />
    </View>
  );
}
