import React from 'react';
import { useEffect } from 'react';
import { Text, View } from 'react-native';

import styles from '../../styles/stylesheet';

import { startTimer, pauseTimer, resumeTimer, endTimer, incrementTime } from '../../reduxLogic/actions'
import { connect } from 'react-redux';
import BackgroundTimer from 'react-native-background-timer';

const _Timer = (props) => {

  const { isIdle, isRunning, isPaused, time, incrementTime } = props;

  let seconds = ("0" + ((time / 1) % 60)).slice(-2)
  let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
  let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)

  /*useEffect(() => {
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
 
  }, [isIdle, isRunning, isPaused]);*/

  useEffect(() => {
    if (isRunning) {
      BackgroundTimer.runBackgroundTimer(() => {
        incrementTime()
      }, 1000)
    } else {
      BackgroundTimer.stopBackgroundTimer();
    }

  }, [isIdle, isRunning, isPaused]);

  //helper function to handle the timer's state, we will be addding more in these functions (geofencing, recording entry to the database)
  //These are seeemingly unused, commenting out to test
  // const handleStart = () => {
  //   startTimer();
  // }
  // const handlePause = () => {
  //   pauseTimer();
  // }
  // const handleResume = () => {
  //   resumeTimer();
  // }
  // const handleEnd = () => {
  //   endTimer()
  // }

  return (
    <View style={{ display: 'flex', flexDirection: 'row', padding: '2%', alignItems: 'center' }}>
      <Text style={styles.timerLabel}>Timer:</Text><Text style={styles.timerText}> {hours}: {minutes}: {seconds}</Text>
    </View>
  )
}


const mapStateToProps = (state) => {
  const { isIdle, isRunning, isPaused, time } = state;
  return { isIdle, isRunning, isPaused, time };
}
const mapDispatchToProps = (dispatch) => {
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    endTimer: () => dispatch(endTimer()),
    incrementTime: () => dispatch(incrementTime())
  }
}

const Timer = connect(mapStateToProps, mapDispatchToProps)(_Timer);
export default Timer;