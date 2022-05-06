import React from 'react';
//import MapView from 'react-native-maps';
import MapView, { Circle } from 'react-native-maps';
import { Dimensions, StyleSheet } from 'react-native';
import COLORS from '../../styles/colors';
import hexToRgba from 'hex-to-rgba';

import realm from '../../userData/realm';

//import Geolocation from "react-native-geolocation-service";

//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;

//Add "getNewestJobColor" function to get the color of the newest job, and use it in circle fill color
const getNewestJobColor = () => {
  let numJobs = realm.objects('Job').length;
  let newestJob = realm.objects('Job')[numJobs - 1];
  if (newestJob) {
    return hexToRgba(newestJob.color, 0.35);
  } else {
    return hexToRgba(COLORS.primary, 0.35);
  }
}

class Map extends React.Component {
  async getCamera() {
    //const camera = await this.map.getCamera();
  }

  async animateCamera() {
    const camera = await this.map.getCamera();
    camera.pitch = 60;
    camera.zoom = 200;
  }
  constructor(props) {
    super(props);

    this.state = {
      region: {
        latitude: this.props.latitude,
        longitude: this.props.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
      },
      coordinate: {
        latitude: this.props.latitude,
        longitude: this.props.longitude
      }
    };
  }

  // componentDidMount() {
  //   Geolocation.getCurrentPosition(
  //     position => {
  //       console.log('Map componentDidMount position:' + position.coords.latitude + ', ' + position.coords.longitude);
  //       this.setState({
  //         region: {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //           latitudeDelta: LATITUDE_DELTA,
  //           longitudeDelta: LONGITUDE_DELTA
  //         },
  //         coordinate: {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude
  //         }
  //       });
  //       console.log('Map componentDidMount state:' + this.state.region.latitude + ', ' + this.state.region.longitude);
  //     },
  //     error => {
  //       console.log('Map componentDidMount error', error);
  //     },
  //     { showLocationDialog: true, enableHighAccuracy: true, timeout: 20000, maximumAge: 0 }
  //   );
  // }

  onRegionChange = (region) => {
    this.setState({
      region: region
    });
    //this.props.updateGeofence(this.state.region.latitude,this.state.region.longitude,(this.state.region.longitudeDelta)*10000);
    console.log((this.state.region.longitudeDelta) * 350000)

  }

  onRegionChangeComplete = (region) => {
    this.setState({
      region: region
    });
    this.props.updateGeofence(this.state.region.latitude, this.state.region.longitude, (this.state.region.longitudeDelta) * 10000);
    console.log("Done")
  }




  /////here//


  /////


  render() {
    if (this.props.latitude && this.props.longitude) {
      console.log('Map render state:' + this.state.region.latitude + ', ' + this.state.region.longitude);
      return (
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          style={styles.map}
          showsScale={true}
          rotateEnabled={false}
          // ref={ref => { this.map = ref }}
          onLayout={() => { }}


          //   if(this.props.latitude && this.props.longitude){

          // else {
          //   latitude: 37.78825,
          //     longitude: -122.4324,
          //     }

          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          }

          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
        >
          <Circle center={{ latitude: this.state.region.latitude, longitude: this.state.region.longitude }} radius={(this.state.region.latitudeDelta) * 35000} fillColor={getNewestJobColor()} />
          {/* fillColor={'rgba(245, 40, 145, 0.35)'} */}

        </MapView>
      );
    }
    else {
      return (
        <MapView
          provider={this.props.provider}
          ref={ref => { this.map = ref; }}
          style={styles.map}
          showsScale={true}
          rotateEnabled={false}
          // ref={ref => { this.map = ref }}
          onLayout={() => { }}

          initialRegion={{

            //Should be user's current location
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          }
        />
      );

    }
  }
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

export default Map;