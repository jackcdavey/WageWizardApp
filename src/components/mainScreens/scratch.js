import React, { useEffect, useState } from "react"
import { StyleSheet, Text, View, Button, Alert } from "react-native"


//we will need this ////////////////////////////////////////////
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"

const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
let foregroundSubscription = null
//////////////////////////////////////////////////////////////

//call first thing

const { useEffect } = require("react");




const [position, setPosition] = useState(null)

//called first thing when the user opens the tracking page 
//request for forground and background location permissions
//if permission is not granted, user cannot use location tracking
useEffect(()=>{
    const requestPermissions = async ()=>{
        const foreground = await Location.requestBackgroundPermissionsAsync()
        if (foreground.granted){
            const background = await Location.requestBackgroundPermissionsAsync()
            if(!background.granted){
                //background permission not granted
                Alert.alert("Background Location Permission Not Granted!");
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

  const startBackgroundUpdate = async () => {

    // Don't track position if permission is not granted
    const { granted } = await Location.getBackgroundPermissionsAsync()
    if (!granted) {
      Alert.alert("Background Location Tracking Denied!")
      return
    }

    // Make sure the task is defined otherwise do not start tracking
    const isTaskDefined = await TaskManager.isTaskDefined(BACKROUND_LOCATION_TRACKING)
    if (!isTaskDefined) {
      Alert.alert("Background Task Not Defined!")
      return
    }

    // Don't track if it is already running in background
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
      BACKROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      Alert.alert("Background Location Tracking Has Already Started!")
      return
    }

    //Start the location tracking in the background if it passes all checks

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

  const stopBackgroundUpdate = async () => {
    const hasStarted = await Location.hasStartedLocationUpdatesAsync(
        BACKROUND_LOCATION_TRACKING
    )
    if (hasStarted) {
      await Location.stopLocationUpdatesAsync(BACKROUND_LOCATION_TRACKING)
      Alert.alert("Background Location Tracking has Stopped")
    }
  }

  const stopForegroundUpdate = () => {
    foregroundSubscription?.remove()
    setPosition(null)
  }




