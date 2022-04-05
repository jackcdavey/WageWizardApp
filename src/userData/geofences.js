//import realm from './realm';
import { useState } from 'react';
import react from 'react';
import React from 'react';
if (global.globalRealmDBUse) {
  realm = require('realm').default;
}

export const addGeofence = () => {
  const [currentJobId, setCurrentJobId] = useState(0);
  const [longitude, setLongitude] = useState(0.0);
  const [latitude, setLatitude] = useState(0.0);
  const [radius, setRadius] = useState(0.0);

  try {
    let newGeofence;
    if (realm) {
      //Just add geofences to the most recent job.
      //Will need to be dependent on the picked job.
      realm.write(() => {
        id = realm.objects('GeofenceLocation').length + 1;
        if (id != realm.objects('GeofenceLocation').length && !realm.objectForPrimaryKey('GeofenceLocation', id)) {
          newGeofence = realm.create('GeofenceLocation', {
            id: id,
            jobId: currentJobId,
            longitude: longitude,
            latitude: latitude,
            radius: radius
          });
          Alert.alert('New geofence created: ', JSON.stringify(newGeofence));
        } else {
          Alert.alert('Geofence already exists. (idk how that is possible)');
        }
      });
    } else {
      Alert.alert('Realm not initialized.');
    }
  } catch (error) {
    Alert.alert('Error creating geofence.');
    console.log('Error creating geofence: ', error);
  }
};


export const clearGeofences = () => {
  try {
    if (realm) {
      realm.write(() => {
        var allGeofences = realm.objects('GeofenceLocation');
        realm.delete(allGeofences);
        console.log('All geofences deleted.');
      });
    } else {
      console.log('Realm not initialized.');
    }
  } catch (error) {
    console.log('Error deleting geofences: ', error);
  }
}

export default function Geofences() {
  if (global.globalRealmDBUse) {
    realm = require('realm').default;
  }
  //Add all geofence objects with matching jobId to a geofences array
  const geofences = realm.objects('GeofenceLocation').filtered('jobId = ' + currentJobId);

  return (
    <>

    </>
  );
}
