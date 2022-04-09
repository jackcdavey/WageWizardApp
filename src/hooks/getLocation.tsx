import { locationUpdate } from "../reduxLogic/actions"


const getLocation = () => {

    //This isn't correct yet but we'll need a way to globally access current location
    const currLocation = locationUpdate();
    const currLat = currLocation.latitude;
    const currLong = currLocation.longitude;


    console.log('Current Location:  ' + currLat + ', ' + currLong);
}

export default getLocation;

