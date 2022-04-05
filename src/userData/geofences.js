
if (global.globalRealmDBUse) {
  realm = require('realm').default;
}

const currentJobId = 1;
const currJob = realm.objectForPrimaryKey('Job', currentJobId);

export const addGeofence = () => {
  try {
    if (realm) {
      realm.write(() => {
        var newGeofence = realm.create('Geofence', {
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

export default function Geofences() {
  //Add all geofence objects with matching jobId to a geofences array
  const geofences = realm.objects('Geofence').filtered('jobId = ' + currentJobId);

  return (
    <>

    </>
  );
}
