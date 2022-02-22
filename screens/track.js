import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';



import COLORS from '../styles/colors'
import Map from './map'



export default function Track() {
  return (
    <View style={styles.container}>
      <Text>Track Screen</Text>
      <Map/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },

});
