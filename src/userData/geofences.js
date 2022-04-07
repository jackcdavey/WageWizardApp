import React from 'react';
import realm from '../userData/realm.js';
export default function Geofences() {
  if (realm) {
    //Add all geofence objects with matching jobId to a geofences array
    const geofences = realm.objects('GeofenceLocation').filtered('jobId = ' + currentJobId);
  }

  return (
    <>

    </>
  );
}
