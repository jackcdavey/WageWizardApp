
import React from 'react';
import { useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, MaskedViewComponent } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from '../../styles/stylesheet.js';
import realm from '../../userData/realm.js';
// import { BlurView } from "@react-native-community/blur";

//TEMPORARY
//Workaround functions for conference demo, will be replaced with functions below when debugged


function getTotalWorkTimeDespitePeriod() {
  let worklogs = realm.objects('WorkLog');
  let totalTime = 0;
  for (let i = 0; i < worklogs.length; i++) {
    let duration = worklogs[i].endTime - worklogs[i].startTime;
    totalTime += duration;
  }
  console.log('total time: ' + totalTime);
  let hour = Math.floor(totalTime / 3600000);
  let min = Math.floor(totalTime / 60000);
  let sec = Math.floor((totalTime % 60000) / 1000);
  return hour + 'h, ' + min + 'm, ' + sec + 's';
}

function getTotalWageDespitePeriod() {
  let worklogs = realm.objects('WorkLog');
  let jobs = realm.objects('Job');
  let totalWage = 0.00;
}

//end of temporary functions




function getAverageHourlyWage() {
  //Calculates the average of all the jobs' non-zero hourly wages
  let jobs = realm.objects('Job');
  let wages = [];
  let totalWage = 0.0;
  for (let i = 0; i < jobs.length; i++) {
    if (jobs[i].wage > 0) {
      wages.push(jobs[i].wage);
      totalWage += jobs[i].wage;
    }
  }
  let averageWage = totalWage / wages.length;
  return averageWage.toFixed(2);
}

function getTotalWorkTimeByPeriod(period) {
  //get current date first
  console.log('period: ' + period);
  let currentDate = new Date().toLocaleDateString();
  console.log('current date:' + currentDate);
  console.log('one week ago: ' + currentDate - 7);
  let worklogs = realm.objects('WorkLog');
  //console.log('worklogs: ' + JSON.stringify(worklogs));
  if (period === 'weekly') {
    for (let i = 0; i < worklogs.length; i++) {
      if (currentDate - 7 < worklogs[i].startTime.toLocaleDateString()) {
        console.log('worklog within range: ' + JSON.stringify(worklogs[i]).id);
      }
    }
    //if the date is within the last week
    //add the log's endtime - starttime to the total

    // let i = 0;
    // while (i < worklogs.length) {
    //   console.log('log times:' + worklogs[i].startTime.toLocaleDateString());
    //   i++;
    // }
  } else if (period === 'biweekly') {

  } else if (period === 'monthly') {

  }
  return 0;
}




export default function MyWage({ navigation }) {


  getAverageHourlyWage();
  const [jobsExist, setJobsExist] = useState(realm.objects('Job').length > 0)
  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Weekly', value: 'weekly' },
    { label: 'Bi-Weekly', value: 'biweekly' },
    { label: 'Monthly', value: 'monthly' },
  ]);

  //getTotalWorkTimeByPeriod(value);
  //getTotalWorkTimeDespitePeriod();

  return (

    <View style={styles.container}>
      {/* <ScrollView contentContainerStyle={{ alignItems: 'center', justifyContent: 'space-evenly', flex: 1 }}> */}
      <Text style={styles.label}>Average Hourly Wage:</Text>
      <Text style={styles.infoTxt}>${getAverageHourlyWage()}</Text>
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
        <Text style={styles.infoTxt}>{getTotalWorkTimeDespitePeriod()}</Text>
      </View>
      <View style={styles.infoBox}>
        <Text style={styles.label}>Total Earned This Week:</Text>
        <Text style={styles.infoTxt}>$XXX</Text>
      </View>
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
      {/* </ScrollView> */}
    </View>

  );
}
