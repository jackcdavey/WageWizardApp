import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//import Map from '../elements/Map.js';
import Timer from '../elements/Timer'
import LocationMap from '../locationTracking/LocationTrackingMap'
import COLORS from '../../styles/colors.js';

import styles from '../../styles/stylesheet';

//import realm from '../../userData/realm';

var jobsLoaded = false;

const Tracking = () => {

  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Job One', value: 'jobone' },
    { label: 'Job Two', value: 'jobtwo' },
  ]);

  //Eventually, we'll want pressing "Start" to trigger an animation that adjusts screen elements to fit
  //the note section and remove job selection, but a temp workaround is to just to add a "TrackActive" screen
  //with proper elements.

  if (global.globalRealmDBUse && !jobsLoaded) {
    realm = require('../../userData/realm').default;
    //    const jobExists = realm.objects('Job').length > 0;

    const allJobs = realm.objects('Job');
    const jobList = [items];

    for (let Job of allJobs) {
      jobList.push({ label: Job.employer, value: Job.id });
    }
    //setItems(Job.name);
    jobsLoaded = true;
  }


  return (

    <View style={styles.container}>
      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}
      <Timer />

      <DropDownPicker
        style={styles.picker}
        placeholder="Select a Job"
        containerStyle={styles.pickerContainer}
        placeholderStyle={styles.pickerLabel}
        labelStyle={styles.pickerLabel}
        itemSeparator={true}
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        //Still seems to work properly despite undeclared setValue property warning
        setValue={setValue}
        setItems={setItems}

        onSelectItem={(item) => {
          //This is where we'll record the job selection and pass to 'ActiveTracking' DB
          console.log(item);
        }}
      />

      <LocationMap />
    </View>
  );
}

export default Tracking;