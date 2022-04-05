//standard react location imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';

//location/geofencing imports
import * as Location from "expo-location"
import { GeofencingEventType, GeofencingRegionState } from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as TaskManager from "expo-task-manager"

//redux logic imports
import { connect } from 'react-redux';
import { store } from '../../reduxLogic/store';
import { startTimer, locationUpdate, endTimer, pauseTimer, resumeTimer, setIsInsideGeofence, setIsTracking, setSelectedJob } from '../../reduxLogic/actions'

//standardized styling import
import COLORS from '../../styles/colors';

//realms db import
import { JsonSerializationReplacer } from 'realm';
const debug_info = true;



/************************************************************** */
/*** GEOFENCING FUNCTIONS USED IN BACKGROUND LOCATION TRACKING***/
/************************************************************** */
function find_distance(lat1, lat2, lon1, lon2) {

  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = lon1 * Math.PI / 180;
  lon2 = lon2 * Math.PI / 180;
  lat1 = lat1 * Math.PI / 180;
  lat2 = lat2 * Math.PI / 180;

  // Haversine formula
  let dlon = lon2 - lon1;
  let dlat = lat2 - lat1;
  let a = Math.pow(Math.sin(dlat / 2), 2)
    + Math.cos(lat1) * Math.cos(lat2)
    * Math.pow(Math.sin(dlon / 2), 2);

  let c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  let r = 6371;

  // calculate the result
  return ((c * r) * 1000);
}
//geofencing function that takes the coord object {lat,long} and regions list [{lat,long,rad}...]
function checkIfInsideAnyGeofence(coord, regions) {
  let isInsideAnyGeofence = false;
  regions.forEach((item) => {

    if (find_distance(item.latitude, coord.latitude, item.longitude, coord.longitude) < item.radius) {
      //set the the state as inside the geofence
      store.dispatch(setIsInsideGeofence(true))
      isInsideAnyGeofence = true;
    }
    //store.dispatch(setIsInsideGeofence(((item.latitude-coord.latitude)*(item.latitude-coord.latitude)+(item.longitude-coord.longitude)*(item.longitude-coord.longitude))<(item.radius*item.radius)))
  });
  if (isInsideAnyGeofence === false) {
    store.dispatch(setIsInsideGeofence(false))
  }
  //else thet state is outside the geofence
  //set the state as outside the geofence

}

const generateGeofence = (selectedJob) => {
  const geofences = selectedJob.locations.map((location) => {
    return {
      latitude: location.latLng.latitude,
      longitude: location.latLng.longitude,
      radius: location.radius
    }
  })
  console.log(geofences)
  return geofences
}

/************************************************************** */
/* GLOBAL SCOPE TASK MANGEMENT FOR BACKGROUND LOCATION SERVICES */
/************************************************************** */
const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
const geofences = generateGeofence(store.getState().selectedJob)
//Background Location Tracker
TaskManager.defineTask(BACKROUND_LOCATION_TRACKING, async ({ data, error }) => {
  if (error) {
    console.error(error)
    return
  }
  if (data) {
    // Extract location coordinates from data
    const { locations } = data
    const location = locations[0]
    if (location) {
      //location state used for the maps is stored in the redux store, 
      //update that store according to background locaiton updates

      //first check for geofences:
      checkIfInsideAnyGeofence({ latitude: location.coords.latitude, longitude: location.coords.longitude }, geofences)

      if (store.getState().isInsideGeofence) {
        if (store.getState().isTracking) {
          if (store.getState().isIdle) {
            store.dispatch(startTimer())
          }
        }
      } else {
        if (!store.getState().isIdle) {
          store.dispatch(endTimer())
        }
      }

      store.dispatch(locationUpdate(location.coords.latitude, location.coords.longitude))
    }
  }
})



/************************************************************** */
/**************** REDUX STORE CONNECTION ************************/
/************************************************************** */

const mapStateToProps = (state, props) => {
  const { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob } = state;
  return { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob };
}

const mapDispatchToProps = (dispatch, props) => {
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    endTimer: () => dispatch(endTimer()),
    setIsTracking: (bool_val) => dispatch(setIsTracking(bool_val)),
    setSelectedJob: (selectedJob) => dispatch(setSelectedJob(selectedJob))
  }
}


/************************************************************** */
/****************      COMPONENT              *******************/
/************************************************************** */


const _LocationMap = (props) => {

  //grabing all of the redux states and dispatches from the props
  const { isIdle, isRunning, isPaused, region, startTimer, endTimer, pauseTimer, resumeTimer, isInsideGeofence, isTracking, setIsTracking, selectedJob, setSelectedJob } = props;

  //useEffect to ask the user for location permissions, must be run first 

  const requestPermissions = async () => {

    //Check if the user has granted fg & bg location permissions
    const foreground = await Location.requestForegroundPermissionsAsync();
    const background = await Location.requestBackgroundPermissionsAsync();

    if (foreground.status !== 'granted') {
      console.log("Foreground Permission Not Given");
      console.log("Foreground value:  " + foreground);
      return;
    } else {
      console.log("Foreground Permission Given");
    }
    if (background.status !== 'granted') {
      console.log("Background Permission Not Given");
      console.log("Background value:  " + background);
      return;
    } else {
      console.log("Background Permission Given")
    }

    let location = await Location.getCurrentPositionAsync({});
    console.log('Current location: ' + location);


  }


  //Start Background Location Updates and Geofencing updates
  const startBackgroundUpdate = async () => {

    // Don't track position if permission is not granted
    const background = await Location.getBackgroundPermissionsAsync();
    if (background.status !== 'granted') {
      console.log("Yeah uh:  " + JSON.stringify(background));
      console.log("location tracking denied")
      requestPermissions();
      return
    }
    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(BACKROUND_LOCATION_TRACKING)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(BACKROUND_LOCATION_TRACKING, {
      // For better logs, we set the accuracy to the most sensitive option
      accuracy: Location.Accuracy.BestForNavigation,
      // Make sure to enable this notification if you want to consistently track in the background
      showsBackgroundLocationIndicator: true,
      foregroundService: {
        notificationTitle: "Location",
        notificationBody: "Location tracking in background",
        notificationColor: "#fff",
      },
    })
  }

  //Stop Background Location Updates and Geofencing updates
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACKROUND_LOCATION_TRACKING)
      console.log("Location tacking stopped")
    }
  }

  //code to handle the location tracking button, pressing the button starts/stops location tracking and geofencing
  const [locationButtonColor, setLocationButtonColor] = useState('green')
  const [locationButtonText, setLocationButtonText] = useState('Start Tracking Location')
  const handleLocationButton = () => {
    if (!isTracking) {
      setIsTracking(true)
      setLocationButtonColor('red')
      setLocationButtonText('Stop Tracking Location')
      startBackgroundUpdate();
    } else {
      setIsTracking(false)
      setLocationButtonColor('green')
      setLocationButtonText('Start Tracking Location')
      //if person is not tracking, timer should end as there is no proof of their location
      endTimer();
      stopBackgroundUpdate();
    }
  }

  const handleStart = () => {
    startBackgroundUpdate();
  }

  const handleResume = () => {
    resumeTimer();
  }
  const handlePause = () => {
    pauseTimer();
  }
  const handleEnd = () => {
    stopBackgroundUpdate();
    endTimer();
  }



  //Realm Stuff
  if (global.globalRealmDBUse) {
    realm = require('../../userData/realm').default;
    const currLog = ' '; //realm.getObjectByPrimaryKey(getCurrLogID()) - Logic for determining current job or new job here
    const currJob = ' '; //Logic for determining chosen job from picker here
  }

  const updateLog = () => {
    //Triggered when a log needs to be updated after a pause
    try {
      if (realm) {

      }
    } catch (error) {
      console.log('Error updating Log: ' + error);
    }
  }

  const createLog = () => {
    //Triggered when a new log needs to be created
    try {
      if (realm) {
        const logSize = realm.objects('WorkLog').length;
        realm.write(() => {
          realm.create('WorkLog', {
            logId: logSize + 1,
            jobId: currJob.id,
            notes: "Notes from Tracking",
            startTime: new Date(), //Change to initial start time of log
            endTime: new Date(),
            breakCount: 0, //Logic for determining break count here
            totalBreakTime: 0, //Logic for determining total break time here
          })
        });
      }
    }
    catch (error) {
      console.log('Error creating Log: ' + error);
    }
  }



  return (
    <View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: region.latitudeDelta,
          longitudeDelta: region.longitudeDelta,
        }}
        region={region}
      >
        <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
        <Circle center={selectedJob.locations[0].latLng} radius={selectedJob.locations[0].radius} fillColor={selectedJob.color} />
        <Circle center={selectedJob.locations[1].latLng} radius={selectedJob.locations[1].radius} fillColor={selectedJob.color} />
        <Circle center={selectedJob.locations[2].latLng} radius={selectedJob.locations[2].radius} fillColor={selectedJob.color} />
        <Circle center={selectedJob.locations[3].latLng} radius={selectedJob.locations[3].radius} fillColor={selectedJob.color} />
        <Circle center={selectedJob.locations[4].latLng} radius={selectedJob.locations[4].radius} fillColor={selectedJob.color} />


      </MapView>

      {/*lOCATION BUTTON, WHEN TRACKING IS DISABLED, LOGIC IS SET UP SO THAT THE USER CANNOT FALSELY START THE TIMER*/}
      {isTracking
        ? isInsideGeofence
          ? <View>
            <TouchableOpacity style={{ backgroundColor: locationButtonColor }} onPress={handleLocationButton}>
              <Text>{locationButtonText}</Text>
            </TouchableOpacity>
            {isPaused
              ? <TouchableOpacity onPress={handleResume}>
                <Text>Resume</Text>
              </TouchableOpacity>
              : <TouchableOpacity onPress={handlePause}>
                <Text>Pause</Text>
              </TouchableOpacity>
            }
          </View>
          : <View>
            <TouchableOpacity style={{ backgroundColor: locationButtonColor }} onPress={handleLocationButton}>
              <Text>{locationButtonText}</Text>
            </TouchableOpacity>
            <Text>---Tracking---</Text>
          </View>
        : <TouchableOpacity style={{ backgroundColor: locationButtonColor }} onPress={handleLocationButton}>
          <Text>{locationButtonText}</Text>
        </TouchableOpacity>
      }

      {/*DUBUG_INFO STATS*/}
      {
        debug_info
          ?
          <View>
            <Text>--------------DEBUG_INFO---------------</Text>
            <Text>isInsideGeofence: {isInsideGeofence.toString()}</Text>
            <Text>isTracking: {isTracking.toString()}</Text>
            <Text>isIdle: {isIdle.toString()}</Text>
            <Text>coordinates: {region.latitude}, {region.longitude}</Text>
          </View>
          :
          <Text></Text>
      }




    </View>

  );
}

const LocationMap = connect(mapStateToProps, mapDispatchToProps)(_LocationMap);
export default LocationMap

const styles = StyleSheet.create({
  map: {
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.35,
  },
});