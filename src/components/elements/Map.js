import React from 'react';
import MapView, { ProviderPropType } from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import COLORS from '../../styles/colors.js';
import { PinchGestureHandler } from 'react-native-gesture-handler';


//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = 0.0421;

class Map extends React.Component {
  async getCamera() {
    const camera = await this.map.getCamera();
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


  render() {
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
          latitude: this.props.latitude,
          longitude: this.props.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }
        }
      />
    );
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