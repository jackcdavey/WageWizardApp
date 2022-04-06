import React from 'react';
import { useState } from 'react';
import { Alert, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//import Map from '../elements/Map.js';
import Timer from '../elements/Timer'
import LocationMap from '../locationTracking/LocationTrackingMap'

import styles from '../../styles/stylesheet';
import JobLocationSetup from '../setupScreens/AddJobLocation';

//import realm from '../../userData/realm';



const Tracking = () => {
  var jobsLoaded = false;
  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'No Jobs', value: -1 },
    { label: 'No Jobs', value: -2 },
    { label: 'No Jobs', value: -3 },
  ]);

  //Eventually, we'll want pressing "Start" to trigger an animation that adjusts screen elements to fit
  //the note section and remove job selection, but a temp workaround is to just to add a "TrackActive" screen
  //with proper elements.

  if (global.globalRealmDBUse && !jobsLoaded) {
    realm = require('../../userData/realm').default;
    const jobExists = realm.objects('Job').length > 0;

    if (jobExists) {
      const allJobs = realm.objects('Job');
      const numJobs = allJobs.length;
      const jobList = [];

      for (let Job of allJobs) {
        const a = { label: Job.employer, value: Job.id };
        jobList.push({ label: Job.employer, value: Job.id });
        //Still not working
        //This position should technically cause only the last job to be displayed, but that doesnt work either...

        //{ () => setItems(items => ({ ...items, label: Job.employer, value: Job.id })) };
      }

      //console.log('label: ' + jobList[0].label);
      //console.log('value: ' + jobList[0].value);

      console.log('Jobs in picker: ' + JSON.stringify(jobList));
      //console.log('Job options for tracking: ', JSON.stringify(allJobs));

      //setItems(Job.name);
      jobsLoaded = true;
    }
  }

  //setItems([{ label: 'No Jobs', value: -5 },]);

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