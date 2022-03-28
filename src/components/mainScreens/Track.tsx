import React from 'react';
import { useState, useEffect } from 'react';
import Map from '../elements/Map';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';

import { Picker } from '@react-native-picker/picker';
import DropDownPicker from 'react-native-dropdown-picker';

import COLORS from '../../styles/colors.js';

export default function Tracking() {
  let testNumber = 7190;

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  // set to to test number to get to 1:59:50 starting time
  const [time, setTime] = useState(0);
  const [isPressed, setPressed] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [buttonColor, setButtonColor] = useState(COLORS.trackTimerStart);

  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'Job One', value: 'jobone' },
    { label: 'Job Two', value: 'jobtwo' },
    { label: 'Job Three', value: 'jobthree' },
    { label: 'Job Four', value: 'jobfour' },
  ]);


  let seconds = ("0" + ((time / 1) % 60)).slice(-2)
  let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
  let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)

  useEffect(() => {
    let interval = setInterval(() => { }, 0);
    if (isActive && isPaused === false) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };

  }, [isActive, isPaused]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  }
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const handlePress = () => {
    if (!isPressed) {
      setPressed(true);
      setButtonText('Stop');
      setButtonColor(COLORS.trackTimerStop);
      handleStart();
    } else {
      setPressed(false);
      setButtonText('Start');
      setButtonColor(COLORS.trackTimerStart);
      handleReset();
    }
  }

  //Eventually, we'll want pressing "Start" to trigger an animation that adjusts screen elements to fit
  //the note section and remove job selection, but a temp workaround is to just to add a "TrackActive" screen
  //with proper elements.

  return (
    <View style={styles.container}>
      <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Timer: {hours}: {minutes}: {seconds}</Text>
      <Map />

      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}
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

      <TouchableOpacity onPress={() => { handlePress() }}>
        <View style={[styles.start, { backgroundColor: buttonColor }]} >
          <Text
            style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}
          >
            {buttonText}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  elements: {
    paddingBottom: Dimensions.get('window').height * 0.02,
    paddingTop: Dimensions.get('window').height * 0.02,
    fontSize: 40,
  },
  map: {
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.35,
  },
  start: {
    width: Dimensions.get('window').height * 0.2,
    height: Dimensions.get('window').height * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: Dimensions.get('window').height * 0.2 / 2,
    borderColor: COLORS.dark,
    borderWidth: 2,
    backgroundColor: "green",
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
    zIndex: 1,
  },
  pickerLabel: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
});



