import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import COLORS from '../styles/colors'


export default function Resources() {
  return (
    <View style={styles.container}>
      <Text>Work Log</Text>
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

