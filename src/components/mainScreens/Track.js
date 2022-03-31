import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//redux logic
import { startTimer, pauseTimer, resumeTimer, endTimer } from '../../reduxLogic/actions'
import { connect } from 'react-redux';

import Map from '../elements/Map.js';
import COLORS from '../../styles/colors.js';

//geofencing loccation
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { JsonSerializationReplacer } from 'realm';

const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
let foregroundSubscription = null


const trackView = (props) => {

  /**********GEOFENCING LOGIC *****************/

  const [position, setPosition] = useState(null)

  useEffect(()=>{
    const requestPermissions = async ()=>{
        const foreground = await Location.requestForegroundPermissionsAsync()
        if (foreground.granted){
            Alert.alert("Foreground Permission Given")
            const background = await Location.requestBackgroundPermissionsAsync()
            if(!background.granted){
                //background permission not granted
                Alert.alert("Background Location Permission Not Granted!");
            }
            else{
              Alert.alert("Background Permission Given")
            }
        } else{
            //forground permission not granted
            Alert.alert("Foreground Location Permission Not Granted!");
        }
    }
    requestPermissions();
},[])

const startForegroundUpdate = async () => {
  // Check if foreground permission is granted
  const { granted } = await Location.getForegroundPermissionsAsync()
  if (!granted) {
    Alert.alert("Foreground Location Tracking Denied!")
    return
  }

  // Make sure that foreground location tracking is not running
  foregroundSubscription?.remove()

  // Start watching position in real-time
  Alert.alert("Foreground Location Tracking Started!")
  foregroundSubscription = await Location.watchPositionAsync(
    {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      timeInterval: 10000

    },
    location => {
      setPosition(location.coords)
    }
  )
}

const stopForegroundUpdate = () => {
  Alert.alert("Foreground Location Tracking Stopped!")
  foregroundSubscription?.remove()
  setPosition(null)
}

/*
  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);

  }
*/


  /********************************************/


  /*********** TIMER LOGIC **********************/
  let testNumber = 7190; // set to to test number to get to 1:59:50 starting time
  //const [time,settime] useState(testNumber)
  const [time, setTime] = useState(0);
  let seconds = ("0" + ((time / 1) % 60)).slice(-2)
  let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
  let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)

  //redux state variables
  const { isIdle, isRunning, isPaused, startTimer, pauseTimer, resumeTimer, endTimer } = props;

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
  const handleStart = () => {
    startTimer();
  }
  const handlePause = () => {
    pauseTimer();
  }
  const handleResume = () => {
    resumeTimer();
  }
  const handleEnd = () => {
    endTimer()
    setTime(0);
  }

  const [locationTracking, setLocationTracking] = useState(false)
  const [locationButtonColor, setLocationButtonColor] = useState('green')
  const [locationButtonText, setLocationButtonText] = useState('Start Tracking Location')
  const handleLocationButton = ()=>{
    if(!locationTracking){
      setLocationTracking(true)
      setLocationButtonColor('red')
      setLocationButtonText('Stop Tracking Location')
      startForegroundUpdate();
    }else{
      setLocationTracking(false)
      setLocationButtonColor('green')
      setLocationButtonText('Start Tracking Location')
      stopForegroundUpdate();
    }

  }
  /*******END OF TIMER LOGIC ********************/



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




    //      <Map longitude = {37.78825} latitude = {-122.4324}/>
    //<Map longitude={locationData.longitude} latitude={locationData.latitude} />


    <View style={styles.container}>
      <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Timer: {hours}: {minutes}: {seconds}</Text>
      <TouchableOpacity onPress={handleStart}>
        <Text>Start</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handlePause}>
        <Text>Pause</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleResume}>
        <Text>Resume</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEnd}>
        <Text>End</Text>
      </TouchableOpacity>
      
      <Map longitude = {37.78825} latitude = {-122.4324}/>



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

      <TouchableOpacity style = {{backgroundColor:locationButtonColor}} onPress={handleLocationButton}>
        <Text>{locationButtonText}</Text>
      </TouchableOpacity>

      <Text>Location: </Text>
      <Text>{JSON.stringify(position)}</Text>
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

const mapStateToProps = (state, props) => {
  const { isIdle, isRunning, isPaused } = state;
  return { isIdle, isRunning, isPaused };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    endTimer: () => dispatch(endTimer()),
  }
}
const Tracking = connect(mapStateToProps, mapDispatchToProps)(trackView);
export default Tracking;