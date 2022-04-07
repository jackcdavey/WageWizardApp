import realm from './realm.js';

//When calling Geofences use "await" in front of it
export default async function Geofences() {

  //Will need to be taken as a parameter
  var currentJobId = 1;

  var geofences = [];
  if (realm) {
    //Add all geofence objects with matching jobId to a geofences array
    geofences.push(realm.objects('GeofenceLocation').filtered('jobId = ' + currentJobId));
  }
  return geofences;
}
