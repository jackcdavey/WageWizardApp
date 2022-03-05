import React from 'react';
import {useState, useEffect} from 'react';
import Map from './Map';

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


import COLORS from '../styles/colors.js';

export default function Tracking() {
  let testNumber = 7190;

  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(true);
  // set to to test number to get to 1:59:50 starting time
  const [time, setTime] = useState(0);
  const [isPressed, setPressed] = useState(false);
  const [buttonText, setButtonText] = useState('Start');
  const [buttonColor, setButtonColor] = useState(COLORS.trackTimerStart);

  let seconds = ("0" + ((time / 1) % 60)).slice(-2)
  let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
  let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)

  useEffect(()=>{
    let interval = setInterval(()=>{},0);
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

  },[isActive,isPaused]); 

  const handleStart = ()=>{
    setIsActive(true);
    setIsPaused(false);
  }
  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };








  const handlePress  = ()=>{
    if (!isPressed){
      setPressed(true);
      setButtonText('Stop');
      setButtonColor(COLORS.trackTimerStop);
      handleStart();
    }else{
      setPressed(false);
      setButtonText('Start');
      setButtonColor(COLORS.trackTimerStart);
      handleReset();
    }
  }




  return (
    <View style={styles.container}>
      <Text style={styles.elements}>Timer: {hours}: {minutes}: {seconds}</Text>
      <Map />
      <Text style={styles.elements}>Job: Default Job</Text>
      <TouchableOpacity>


        <View style={[styles.start,{backgroundColor: buttonColor}]} >
          <Text 
            style={styles.elements}
            onPress = {()=>{handlePress()}}
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
    //fontFamily: 'SFPro-Regular',
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
});



