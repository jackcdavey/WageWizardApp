import React from 'react';
import { useState, useEffect } from 'react';
import {connect} from 'react-redux';

import {SafeAreaView, ScrollView, StatusBar,Dimensions,StyleSheet,Text,useColorScheme,View,TouchableOpacity,Alert,} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import Map from '../elements/Map.js';
import COLORS from '../../styles/colors.js';

import {startTimer, pauseTimer, resumeTimer, endTimer} from '../../reduxLogic/actions'






const trackView = (props) => {

  let testNumber = 7190; // set to to test number to get to 1:59:50 starting time
  const [time, setTime] = useState(0);
  let seconds = ("0" + ((time / 1) % 60)).slice(-2)
  let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
  let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)
 
  //redux state variables
  const {isIdle, isRunning, isPaused, startTimer, pauseTimer, resumeTimer,endTimer} = props;
  
  useEffect(() => {
    let interval = setInterval(() => { }, 0);
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => {
      clearInterval(interval);
    };

  }, [isIdle, isRunning, isPaused]);

  //helper function to handle the timer's state, we will be addding more in these functions (geofencing, recording entry to the database)
  const handleStart = () =>{
    startTimer();
  }
  const handlePause = () =>{
    pauseTimer();
  }
  const handleResume = () =>{
    resumeTimer();
  }
  const handleEnd = () =>{
    endTimer()
    setTime(0);
  }



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

      {/* Overhauled the control buttons to match the new state logic */}
      <TouchableOpacity onPress = {handleStart}>
        <Text>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {handlePause}>
        <Text>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {handleResume}>
        <Text>Resume</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress = {handleEnd}>
        <Text>End</Text>
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


//Connecting our component to the redux store

const mapStateToProps = (state,props) =>{
  const {isIdle, isRunning, isPaused} = state;
  return {isIdle, isRunning, isPaused};
}
const mapDispatchToProps = (dispatch,props)=>{
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    endTimer: () => dispatch(endTimer()),
  }
}
const Tracking = connect(mapStateToProps, mapDispatchToProps)(trackView);
export default Tracking;
