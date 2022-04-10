
import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../styles/stylesheet.js';

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
