import * as React from 'react';
import MapView, { Circle } from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { Polygon } from 'react-native-maps';


import { connect } from 'react-redux';
import { store } from '../../reduxLogic/store';
import { startTimer, locationUpdate, endTimer } from '../../reduxLogic/actions'



import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';
import { useState, useEffect } from 'react';

import COLORS from '../../styles/colors';

//geofencing loccation
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { GeofencingEventType } from 'expo-location';
import { JsonSerializationReplacer } from 'realm';

const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
const GEOFENCE_TRACKING = "GEOFENCE_TRACKING "

let foregroundSubscription = null

const nobili = {
  center: {
    latitude: 37.348899,
    longitude: -121.942312
  },
  radius: 30
}

const scdi = {
  center: {
    latitude: 37.349036,
    longitude: -121.938545
  },
  radius: 30
}

const heafey = {
  center: {
    latitude: 37.349090,
    longitude: -121.939589
  },
  radius: 30
}


const benson = {
  center: {
    latitude: 37.347578,
    longitude: -121.939423
  },
  radius: 40
}

const geofences = [
  {
    latitude:nobili.center.latitude,
    longitude:nobili.center.longitude,
    radius:nobili.radius
  },
  {
    latitude:scdi.center.latitude,
    longitude:scdi.center.longitude,
    radius:scdi.radius
  },
  {
    latitude:benson.center.latitude,
    longitude:benson.center.longitude,
    radius:benson.radius
  },
  {
    latitude:heafey.center.latitude,
    longitude:heafey.center.longitude,
    radius:heafey.radius
  }
]

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
      console.log("Location in background", location.coords)
      store.dispatch(locationUpdate(location.coords.latitude,location.coords.longitude))
    }
  }
})

TaskManager.defineTask(GEOFENCE_TRACKING, ({ data: { eventType, region }, error }) => {
  if (error) {
    // check `error.message` for more details.
    return;
  }
  if (eventType === GeofencingEventType.Enter) {
    console.log("You've entered region:", region);
    store.dispatch(startTimer())
  } else if (eventType === GeofencingEventType.Exit) {
    console.log("You've left region:", region);
    store.dispatch(endTimer())
  }
});

const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;







const _LocationMap = (props) =>{
  /**********GEOFENCING LOGIC *****************/

  const { isIdle, isRunning, isPaused, region, startTimer, endTimer} = props;

  const [position, setPosition] = useState(null)
  const [regions, setRegions] = useState(
      {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      }
  )

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
      setPosition(location)
      setRegions({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      })
    }
  )
}

const stopForegroundUpdate = () => {
  Alert.alert("Foreground Location Tracking Stopped!")
  foregroundSubscription?.remove()
  setPosition(null)
}

  // Start location tracking in background
  const startBackgroundUpdate = async () => {
    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      console.log("location tracking denied")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(BACKROUND_LOCATION_TRACKING)
    if (!isTaskDefined) {
      console.log("Task is not defined")
      return
    }
    const isGeofenceTaskDefined = await TaskManager.isTaskDefined(GEOFENCE_TRACKING)
    if (!isGeofenceTaskDefined) {
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
    const hasGeofenceStarted = await Location.hasStartedGeofencingAsync(
      GEOFENCE_TRACKING
    )
    if (hasGeofenceStarted) {
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

    await Location.startGeofencingAsync(GEOFENCE_TRACKING,geofences)
  }

  // Stop location tracking in background
  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACKROUND_LOCATION_TRACKING)
      console.log("Location tacking stopped")
    }
    const hasGeofenceStarted = await Location.hasStartedGeofencingAsync(
      GEOFENCE_TRACKING
    )
    if (hasGeofenceStarted) {
      await Location.stopGeofencingAsync(GEOFENCE_TRACKING)
      console.log("Location tacking stopped")
    }

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

  const [locationTracking, setLocationTracking] = useState(false)
  const [locationButtonColor, setLocationButtonColor] = useState('green')
  const [locationButtonText, setLocationButtonText] = useState('Start Tracking Location')
  const handleLocationButton = ()=>{
    if(!locationTracking){
      setLocationTracking(true)
      setLocationButtonColor('red')
      setLocationButtonText('Stop Tracking Location')
      //startForegroundUpdate();
      //Alert.alert(regions)
      Alert.alert(JSON.stringify(region))
      startBackgroundUpdate();
    }else{
      setLocationTracking(false)
      setLocationButtonColor('green')
      setLocationButtonText('Start Tracking Location')
      //stopForegroundUpdate();
      stopBackgroundUpdate();
    }

  }




  return (
      <View>
        <MapView 
            style={styles.map}
            initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            }} 
            region = {region}
        >
            <Marker
                coordinate = {{latitude:region.latitude , longitude:region.longitude}}
            />
            <Circle center={nobili.center} radius = {nobili.radius} fillColor = {'rgba(245, 40, 145, 0.35)'}/>
            <Circle center={benson.center} radius = {benson.radius} fillColor = {'rgba(245, 40, 145, 0.35)'}/>
            <Circle center={scdi.center} radius = {scdi.radius} fillColor = {'rgba(245, 40, 145, 0.35)'}/>
            <Circle center={heafey.center} radius = {heafey.radius} fillColor = {'rgba(245, 40, 145, 0.35)'}/>


        </MapView>
        <TouchableOpacity style = {{backgroundColor:locationButtonColor}} onPress={handleLocationButton}>
            <Text>{locationButtonText}</Text>
        </TouchableOpacity>

        <Text>Location: </Text>
        <Text>{JSON.stringify(region)}</Text>

      </View>

  );
}


const mapStateToProps = (state, props) => {

  const { isIdle, isRunning, isPaused, region } = state;
  return { isIdle, isRunning, isPaused, region };

}

const mapDispatchToProps = (dispatch, props) => {
  return {
    startTimer: () => dispatch(startTimer()),
    endTimer: () => dispatch(endTimer()),
  }
}

const LocationMap = connect(mapStateToProps,mapDispatchToProps)(_LocationMap);
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