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
    display: 'flex',
    minWidth: Dimensions.get('window').width * 0.9,
    minHeight: Dimensions.get('window').height * 0.07,
    margin: 15,
    padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  infoTxt: {
    fontSize: 50,
  },
  btn: {
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.2,
    backgroundColor: COLORS.primary,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
  }
});

export default function MyWage({ navigation }: { navigation: any }) {

  return (
    <View style={{
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={styles.label}>San Jose Minimum Wage:</Text>
      <Text style={styles.infoTxt}>$XX.XX</Text>
      <View style={styles.infoBox} >
        <Text style={styles.label}>Weekly</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Total Time Worked This Week:</Text>
        <Text style={styles.infoTxt}>XXh, XXm</Text>
      </View>
      <View style={styles.infoBox} />
      <TouchableOpacity onPress={() => navigation.navigate("Work Logs")}>
        <View style={styles.btn} >
          <Text style={styles.btnTxt}>See Recordings Here</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
