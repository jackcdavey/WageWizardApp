import React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';

import { startTimer, pauseTimer, resumeTimer, endTimer, incrementTime } from '../../reduxLogic/actions'
import { connect } from 'react-redux';

const _Timer = (props) => {

    const { isIdle, isRunning, isPaused, time, startTimer, pauseTimer, resumeTimer, endTimer, incrementTime} = props;

    let seconds = ("0" + ((time / 1) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
    let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)
  
    useEffect(() => {
      let interval = setInterval(() => { }, 0);
      if (isRunning) {
        interval = setInterval(() => {
          incrementTime()
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
    }

    return(
        <View>
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
        </View>
    )
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

  });

const mapStateToProps = (state, props) => {
    const { isIdle, isRunning, isPaused, time } = state;
    return { isIdle, isRunning, isPaused, time };
  }
const mapDispatchToProps = (dispatch, props) => {
    return {
        startTimer: () => dispatch(startTimer()),
        pauseTimer: () => dispatch(pauseTimer()),
        resumeTimer: () => dispatch(resumeTimer()),
        endTimer: () => dispatch(endTimer()),
        incrementTime: ()=>dispatch(incrementTime())
    }
}

const Timer = connect(mapStateToProps, mapDispatchToProps)(_Timer);
export default Timer;