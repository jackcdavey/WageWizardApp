import COLORS from '../../styles/colors.js';
import React from 'react';
import { useState } from 'react';
import { StyleSheet, Text, Dimensions, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function MyWage({ navigation }: { navigation: any }) {

  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'biweekly' },
    { label: 'Monthly', value: 'monthly' },
  ]);

  return (
    <View style={{
      flexDirection: 'column',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      <Text style={styles.label}>San Jose Minimum Wage:</Text>
      <Text style={styles.infoTxt}>$XX.XX</Text>
      <View style={{ zIndex: 1 }}>
        <DropDownPicker
          style={styles.picker}
          containerStyle={styles.pickerContainer}
          placeholder="Weekly"
          placeholderStyle={styles.pickerLabel}
          labelStyle={styles.pickerLabel}
          itemSeparator={true}
          open={open}
          value={value}
          items={items}
          defaultValue={'weekly'}
          setOpen={setOpen}
          //Still seems to work properly despite undeclared setValue property warning
          setValue={setValue}
          setItems={setItems}

          onSelectItem={(item) => {
            //This is where we'll record the job selection and pass to 'ActiveTracking' DB
            console.log(item);
          }}
        />
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
    borderColor: COLORS.primary,
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.secondary,
  },
  picker: {
    //width: Dimensions.get('window').width * 0.9,
    //height: Dimensions.get('window').height * 0.07,
    margin: 15, padding: 10,
    backgroundColor: COLORS.secondary,
    borderRadius: 15,
    borderColor: COLORS.primary,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pickerContainer: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.07,
    margin: 15,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.primary,
  },
  pickerLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});