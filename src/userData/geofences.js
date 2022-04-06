//import realm from './realm';
import { useState } from 'react';
import react from 'react';
import React from 'react';
if (global.globalRealmDBUse) {
  realm = require('realm').default;
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
