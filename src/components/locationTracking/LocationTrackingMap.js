//standard react location imports
import * as React from 'react';
import { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';

//location/geofencing imports
import * as Location from "expo-location"
import { GeofencingEventType } from 'expo-location';
import MapView, { Circle, Marker } from 'react-native-maps';
import * as TaskManager from "expo-task-manager"
import {establishment, generateGeofence} from './establishments'

//redux logic imports
import { connect } from 'react-redux';
import { store } from '../../reduxLogic/store';
import { startTimer, locationUpdate, endTimer } from '../../reduxLogic/actions'

//standardized styling import
import COLORS from '../../styles/colors';

//realms db import
import { JsonSerializationReplacer } from 'realm';


/************************************************************** */
/* GLOBAL SCOPE TASK MANGEMENT FOR BACKGROUND LOCATION SERVICES */
/************************************************************** */

const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
const GEOFENCE_TRACKING = "GEOFENCE_TRACKING "

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
      store.dispatch(locationUpdate(location.coords.latitude,location.coords.longitude))
    }
  }
})

//Background Geofencing
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

/************************************************************** */
/**************** REDUX STORE CONNECTION ************************/
/************************************************************** */

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


/************************************************************** */
/****************      COMPONENT              *******************/
/************************************************************** */


const _LocationMap = (props) =>{
  
    //grabing all of the redux states and dispatches from the props
    const { isIdle, isRunning, isPaused, region, startTimer, endTimer} = props;

    //useEffect to ask the user for location permissions, must be run first 
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

    //Start Background Location Updates and Geofencing updates
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
    
        const geofences = generateGeofence(establishment)
        await Location.startGeofencingAsync(GEOFENCE_TRACKING,geofences)
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
        const hasGeofenceStarted = await Location.hasStartedGeofencingAsync(
          GEOFENCE_TRACKING
        )
        if (hasGeofenceStarted) {
          await Location.stopGeofencingAsync(GEOFENCE_TRACKING)
          console.log("Location tacking stopped")
        }
    
    }

    //code to handle the location tracking button, pressing the button starts/stops location tracking and geofencing
    const [tackingLocation, setTrackingLocation] = useState(false)
    const [locationButtonColor, setLocationButtonColor] = useState('green')
    const [locationButtonText, setLocationButtonText] = useState('Start Tracking Location')
    const handleLocationButton = ()=>{
        if(!tackingLocation){
        setTrackingLocation(true)
        setLocationButtonColor('red')
        setLocationButtonText('Stop Tracking Location')
        startBackgroundUpdate();
        }else{
        setTrackingLocation(false)
        setLocationButtonColor('green')
        setLocationButtonText('Start Tracking Location')
        stopBackgroundUpdate();
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
                region = {region}
            >
                <Marker coordinate = {{latitude:region.latitude , longitude:region.longitude}}/>
                <Circle center = {establishment.locations[0].latLng} radius = {establishment.locations[0].radius} fillColor = {establishment.color}/>
                <Circle center = {establishment.locations[1].latLng} radius = {establishment.locations[1].radius} fillColor = {establishment.color}/>
                <Circle center = {establishment.locations[2].latLng} radius = {establishment.locations[2].radius} fillColor = {establishment.color}/>
                <Circle center = {establishment.locations[3].latLng} radius = {establishment.locations[3].radius} fillColor = {establishment.color}/>

            </MapView>

            <TouchableOpacity style = {{backgroundColor:locationButtonColor}} onPress={handleLocationButton}>
                <Text>{locationButtonText}</Text>
            </TouchableOpacity>

            <Text>Location: </Text>
            <Text>{JSON.stringify(region)}</Text>

        </View>

    );
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