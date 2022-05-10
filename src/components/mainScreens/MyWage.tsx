
import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../styles/stylesheet.js';
// import { BlurView } from "@react-native-community/blur";

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
          placeholder="Select a Job"
          containerStyle={styles.pickerContainer}
          placeholderStyle={styles.pickerLabel}
          dropDownContainerStyle={styles.pickerDropDownContainer}
          listItemLabelStyle={styles.pickerListItemLabel}
          labelStyle={styles.pickerLabel}
          itemSeparator={true}
          open={open}
          value={value}
          items={items}
          listMode="FLATLIST"
          flatListProps={{
            initialNumToRender: 3
          }}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          zIndex={1000}

          onSelectItem={(item) => {
            //This is where to set the values for the Wage calculations
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
        <View style={styles.buttonWide} >
          <Text style={styles.buttonText}>See Logs Here</Text>
        </View>
      </TouchableOpacity>


      {/* <BlurView
        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, zIndex: 1 }}
        blurType="regular"
        blurAmount={20}
        reducedTransparencyFallbackColor="white"
      />
      <View style={{ position: 'absolute', top: Dimensions.get('window').height / 3, zIndex: 1 }}>
        <Text style={styles.title}>My Wage Page Coming Soon!</Text>
      </View> */}
    </View>
  );
}
