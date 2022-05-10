
import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../styles/stylesheet.js';
import { BlurView } from "@react-native-community/blur";

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
    <View style={styles.container}>
      <Text style={styles.label}>Average Hourly Wage:</Text>
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


      {/* <BlurView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 1 }}
        blurType="light"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{ position: 'absolute', top: Dimensions.get('window').height / 3, zIndex: 1 }}>
        <Text style={styles.title}>My Wage Page Coming Soon!</Text>
      </View> */}
    </View>
  );
}
