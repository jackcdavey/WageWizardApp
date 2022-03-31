import * as React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

import { SafeAreaView, ScrollView, StatusBar, Dimensions, StyleSheet, Text, useColorScheme, View, TouchableOpacity, Alert, } from 'react-native';
import { useState, useEffect } from 'react';

import COLORS from '../../styles/colors';

//geofencing loccation
import * as TaskManager from "expo-task-manager"
import * as Location from "expo-location"
import { JsonSerializationReplacer } from 'realm';

const BACKROUND_LOCATION_TRACKING = "BACKROUND_LOCATION_TRACKING "
let foregroundSubscription = null

const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;


export default function LocationMap() {

  /**********GEOFENCING LOGIC *****************/

  const [position, setPosition] = useState(null)
  const [region, setRegion] = useState(
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
      setRegion({
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
      startForegroundUpdate();
    }else{
      setLocationTracking(false)
      setLocationButtonColor('green')
      setLocationButtonText('Start Tracking Location')
      stopForegroundUpdate();
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

        </MapView>
        <TouchableOpacity style = {{backgroundColor:locationButtonColor}} onPress={handleLocationButton}>
            <Text>{locationButtonText}</Text>
        </TouchableOpacity>

        <Text>Location: </Text>
        <Text>{JSON.stringify(position)}</Text>

      </View>

  );
}

const styles = StyleSheet.create({
    map: {
      borderRadius: 15,
      borderColor: COLORS.dark,
      borderWidth: 2,
      width: Dimensions.get('window').width * 0.9,
      height: Dimensions.get('window').height * 0.35,
    },
  });