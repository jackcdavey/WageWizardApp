//import realm from './realm';
import { useState } from 'react';
import react from 'react';
import React from 'react';
if (global.globalRealmDBUse) {
  realm = require('realm').default;
}

export const addGeofence = () => {
  const [currentJobId, setCurrentJobId] = useState(0);
  try {
    let newGeofence;
    if (realm) {
      //Just add geofences to the most recent job.
      //Will need to be dependent on the picked job.
      realm.write(() => {
        if (realm.objects('Job').length > 0) {
          setCurrentJobId(realm.objects('Job')[realm.objects('Job').length - 1].id);
        } else {
          setCurrentJobId(-1);
        }

        newGeofence = realm.create('GeofenceLocation', {
          id: realm.objects('GeofenceLocation').length + 1,
          jobId: currentJobId,
          name: '',
          latitude: 0,
          longitude: 0,
          radius: 0,
          isActive: false,
        });
        console.log('New geofence created: ', JSON.stringify(newGeofence));
      });
    }
  } catch (error) {
    console.log('Error creating geofence: ', error);
  }
}

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
