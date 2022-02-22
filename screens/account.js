import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import COLORS from '../styles/colors'


export default function Account() {
  return (
    <View style={styles.container}>
      <Text>Account</Text>
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
