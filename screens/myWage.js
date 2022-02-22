import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import COLORS from '../styles/colors'

export default function MyWage() {
  return (
    <View style={styles.container}>
      <Text>My Wage Screen</Text>
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
