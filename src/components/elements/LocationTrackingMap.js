//standard react location imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Modal, Image, TextInput } from 'react-native';
import { BlurView } from "@react-native-community/blur";
import styles from '../../styles/stylesheet.js';
//location/geofencing imports
import * as Location from "expo-location"
import MapView, { Circle, Marker, Icon } from 'react-native-maps';
import * as TaskManager from "expo-task-manager"

//redux logic imports
import { connect } from 'react-redux';
import { store } from '../../reduxLogic/store';
import { startTimer, locationUpdate, endTimer, pauseTimer, resumeTimer, setIsInsideGeofence, setIsTracking, addNote, setNote, updateStartTime, updateEndTime } from '../../reduxLogic/actions'

import realm from '../../userData/realm.js';



//realms db import
const debug_info = false;



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

//Unused
// const generateGeofence = (selectedJob) => {
//   const geofences = selectedJob.locations.map((location) => {
//     return {
//       latitude: location.latLng.latitude,
//       longitude: location.latLng.longitude,
//       radius: location.radius
//     }
//   })
//   console.log(geofences)
//   return geofences
// }

const createLog = () => {
  //Triggered when a new log needs to be created

  try {
    const logSize = realm.objects('WorkLog').length;
    realm.write(() => {
      realm.create('WorkLog', {
        id: logSize + 1,
        //jobId: store.getState().jobId,
        jobId: store.getState().jobId,
        notes: store.getState().note,
        startTime: store.getState().start_time,
        endTime: store.getState().end_time,
        breakCount: 0, //Logic for determining break count here
        totalBreakTime: 0, //Logic for determining total break time here
        date: new Date(),
        time: store.getState().time
      })
    });

  }
  catch (error) {
    console.log('Error creating Log: ' + error);
  }
  console.log("hi created")
  store.dispatch(setNote(""))
}

/************************************************************** */
/* GLOBAL SCOPE TASK MANGEMENT FOR BACKGROUND LOCATION SERVICES */
/************************************************************** */
const BACKGROUND_LOCATION_TRACKING = "BACKGROUND_LOCATION_TRACKING "
//const geofences = generateGeofence(store.getState().selectedJob)
//Background Location Tracker
TaskManager.defineTask(BACKGROUND_LOCATION_TRACKING, async ({ data, error }) => {
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
      const geofences = realm.objects("GeofenceLocation").filtered("jobId = " + store.getState().jobId)
      const formattedGeofences = geofences.map((item) => {
        return ({
          latitude: item.latitude,
          longitude: item.longitude,
          radius: item.radius
        })
      })
      checkIfInsideAnyGeofence({ latitude: location.coords.latitude, longitude: location.coords.longitude }, formattedGeofences)

      if (store.getState().isInsideGeofence) {
        if (store.getState().isTracking) {
          if (store.getState().isIdle) {
            store.dispatch(updateStartTime(new Date()))
            store.dispatch(startTimer())
          }
        }
      } else {
        if (!store.getState().isIdle) {
          //create the log
          store.dispatch(updateEndTime(new Date()))
          createLog();
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

const mapStateToProps = (state) => {
  const { isIdle, isRunning, isPaused, region, time, isInsideGeofence, isTracking, jobId, note, start_time, end_time } = state;
  return { isIdle, isRunning, isPaused, region, time, isInsideGeofence, isTracking, jobId, note, start_time, end_time };
}

const mapDispatchToProps = (dispatch) => {
  return {
    startTimer: () => dispatch(startTimer()),
    pauseTimer: () => dispatch(pauseTimer()),
    resumeTimer: () => dispatch(resumeTimer()),
    endTimer: () => dispatch(endTimer()),
    setIsTracking: (bool_val) => dispatch(setIsTracking(bool_val)),
    addNote: (note) => dispatch(addNote(note)),
    updateStartTime: (start_time) => dispatch(updateStartTime(start_time)),
    updateEndTime: (end_time) => dispatch(updateEndTime(end_time))

  }
}


/************************************************************** */
/****************      COMPONENT              *******************/
/************************************************************** */


const _LocationMap = (props) => {

  //grabing all of the redux states and dispatches from the props
  const { isIdle, isPaused, region, time, endTimer, pauseTimer, resumeTimer, isInsideGeofence, isTracking, setIsTracking, jobId, note, addNote, updateEndTime } = props;

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
    } else {
      //store.dispatch(locationUpdate(location.coords.latitude, location.coords.longitude));
      console.log("location tracking already granted");
    }
    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(BACKGROUND_LOCATION_TRACKING)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKGROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      console.log("Already started")
      return
    }

    await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TRACKING, {
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
      BACKGROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TRACKING)
      console.log("Location tacking stopped")
    }
  }

  //code to handle the location tracking button, pressing the button starts/stops location tracking and geofencing
  const [locationButtonColor, setLocationButtonColor] = useState('green')
  const [locationButtonText, setLocationButtonText] = useState('Start')
  const handleLocationButton = () => {
    if (!isTracking) {
      setIsTracking(true)
      setLocationButtonColor('red')
      setLocationButtonText('Stop')
      startBackgroundUpdate();
    } else {
      setIsTracking(false)
      setLocationButtonColor('green')
      setLocationButtonText('Start')
      //if person is not tracking, timer should end as there is no proof of their location
      //ensure to create a log only if the user was inside a geofence
      if (time !== 0) {
        updateEndTime(new Date())
        createLog();
      }
      endTimer();
      stopBackgroundUpdate();
    }
  }

  const [noteModalVisible, setNoteModalVisible] = useState(false);
  const createNote = () => {
    setNoteModalVisible(true);
  }


  const [geofences, setGeofences] = useState([])
  useEffect(() => {
    setGeofences(realm.objects("GeofenceLocation").filtered("jobId =" + jobId))
  }, [jobId])

  // const handleStart = () => {
  //   startBackgroundUpdate();
  // }

  const handleResume = () => {
    resumeTimer();
  }
  const handlePause = () => {
    pauseTimer();
  }
  // const handleEnd = () => {
  //   stopBackgroundUpdate();;
  //   endTimer();
  // }

  const [noteText, setNoteText] = useState(' ')

  return (
    <View style={{ alignItems: 'center', display: 'flex', flexDirection: 'column' }}>



      <View style={styles.mapContainer}>
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
          <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} >
            <Image source = {require('../../assets/images/icons/ProfileDefault.png')} style={{width: 30, height: 30}}/>
          </Marker>
          {
            (geofences.length > 0)
              ? geofences.map((location) => {
                return (<Circle key={location.id} center={{ latitude: location.latitude, longitude: location.longitude }} radius={location.radius} fillColor={'rgba(245, 40, 145, 0.35)'} />)
              })
              : <></>
          }

        </MapView>
      </View>

      {/*lOCATION BUTTON, WHEN TRACKING IS DISABLED, LOGIC IS SET UP SO THAT THE USER CANNOT FALSELY START THE TIMER*/}
      {(jobId === -5)
        ? <Text style={styles.prompt}>Select a Job to Start Tracking</Text>
        : <View style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', paddingTop: '5%' }}>
          {isTracking
            ? isInsideGeofence
              ? <View>
                <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }}>
                  <View style={{}}>
                    <TouchableOpacity style={styles.noteButton} onPress={createNote}>
                      <Image source={require('../../assets/images/icons/Pencil.png')} style={{ width: '65%', height: '100%' }} resizeMode='contain'></Image>
                    </TouchableOpacity>
                  </View>
                  <View style={{ alignItems: 'flex-end' }}>
                    <TouchableOpacity style={styles.stopButton} onPress={handleLocationButton}>
                      <Text style={styles.buttonText}>{locationButtonText}</Text>
                    </TouchableOpacity>
                  </View>
                  {isPaused
                    ? <View style={{ alignItems: 'flex-end' }}><TouchableOpacity style={styles.noteButton} onPress={handleResume}>
                      <Image source={require('../../assets/images/icons/Resume.png')} style={{ maxWidth: '30%' }} resizeMode='contain'></Image>
                    </TouchableOpacity ></View>
                    : <View style={{ alignItems: 'flex-end' }}><TouchableOpacity style={styles.noteButton} onPress={handlePause}>
                      <Image source={require('../../assets/images/icons/Pause.png')} style={{ maxWidth: '30%' }} resizeMode='contain'></Image>
                    </TouchableOpacity></View>
                  }



                  <Modal
                    animationType="slide"
                    transparent={true}
                    visible={noteModalVisible}
                    onRequestClose={() => {
                      setNoteModalVisible(false);
                      //addNote(noteText);

                    }}
                  >
                    <View style={styles.modalContainer}>
                      <BlurView
                        style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
                        blurType="light"
                        blurAmount={20}
                        reducedTransparencyFallbackColor="white"
                      />
                      <View style={styles.noteTextField}>
                        <TouchableOpacity style={styles.closeButton} onPress={() => {
                          addNote(noteText)
                          setNoteModalVisible(false);
                        }}>
                          <Text style={styles.closeButtonText}>X</Text>
                        </TouchableOpacity>
                        <TextInput
                          style={styles.noteText}
                          placeholder='Add notes here...'
                          placeholderTextColor={COLORS.lightPlaceholder}
                          multiline={true}
                          onChangeText={newText => setNoteText(newText)}
                        >
                        </TextInput>

                      </View>
                    </View>

                  </Modal>

                </View>

              </View>
              : <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >

                <TouchableOpacity style={styles.stopButton} onPress={handleLocationButton}>
                  <Text style={styles.buttonText}>{locationButtonText}</Text>
                </TouchableOpacity>


                {/* {console.log('Now Tracking')} */}
              </View>
            : <TouchableOpacity style={styles.startButton} onPress={handleLocationButton}>
              <Text style={styles.buttonText}>{locationButtonText}</Text>
            </TouchableOpacity>
          }
        </View>
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
            <Text>jobId: {jobId}</Text>
            <Text>Note: {note}</Text>
          </View>
          :
          <Text></Text>
      }




    </View>

  );
}


const LocationMap = connect(mapStateToProps, mapDispatchToProps)(_LocationMap);
export default LocationMap

