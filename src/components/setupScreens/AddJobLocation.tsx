import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, TextInput, Text } from "react-native";
import Map from '../elements/Map.js';

import styles from '../../styles/stylesheet.js';




export default function JobLocationSetup({ navigation }: { navigation: any }) {

    const [searchText, setSearchText] = useState('500 El Camino Real San Jose CA');
    const [resultCoordinates, setResultCoordinates] = useState({ 'latitude': 66.666, 'longitude': -122.696 });
    function getCoordinatesFromAddress() {
        return new Promise((resolve) => {
            const txt = JSON.stringify(searchText);
            console.log('Searchtext: ' + txt);
            const url = 'https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=' + txt + '&&apiKey=VyBjmC6PoIXhlNzKVm5r7eWr5-qoZbWVJaSoGCUrKGw';
            fetch(url)
                .then((response) => response.json())
                .then((responseJson) => {
                    console.log('URL Used: ' + url);
                    console.log('Response: ' + JSON.stringify(responseJson));
                    if (responseJson
                        && responseJson.Response
                        && responseJson.Response.View
                        && responseJson.Response.View[0]
                        && responseJson.Response.View[0].Result
                        && responseJson.Response.View[0].Result[0]
                        && responseJson.Response.View[0].Result[0].Location
                        && responseJson.Response.View[0].Result[0].Location.DisplayPosition
                    ) {
                        console.log('Location search API response good');
                        //console.log('Response good:' + JSON.stringify(responseJson))
                        resolve({
                            latitude: responseJson.Response.View[0].Result[0].Location.DisplayPosition.Latitude,
                            longitude: responseJson.Response.View[0].Result[0].Location.DisplayPosition.Longitude
                        });
                    } else {
                        console.log('Response bad:' + responseJson)
                        resolve({
                            latitude: 0,
                            longitude: 0
                        });
                    }
                })
                .catch((error) => {
                    console.error('Error looking up coordinates for address: ' + error);
                })
        })
    }

    async function fetchCoordinates() {
        const coordinates = await getCoordinatesFromAddress();
        console.log('Coordinates: ' + JSON.stringify(coordinates));
        setResultCoordinates(coordinates);
        console.log('Result coordinates: ' + resultCoordinates.latitude + ' ' + resultCoordinates.longitude);
        //return coordinates;
    }



    //const responseCoordinates = await getCoordinatesFromAddress(searchtext);
    //console.log('Coordinates of searchtext: ' + JSON.stringify(responseCoordinates));

    const JobLocationSetupMap = () => {
        return (
            <>
                <Map
                    //style={styles.setupMap}
                    initialRegion={{
                        latitude: 38.78825,
                        longitude: -122.4324,
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}
                />
            </>
        );
    }





    //fetchCoordinates(searchtext);
    return (
        <View style={styles.container}>
            <View style={styles.directionsWrap}>
                <Text style={styles.title}>Add A Job</Text>
            </View>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    To configure automatic tracking,
                    adjust the cicle below until your
                    place of work is inside.
                </Text>
            </View>

            <View style={styles.searchContainer}>
                <TextInput style={styles.searchText} placeholder="Search Address..." placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setSearchText(newText)} />
                <TouchableOpacity style={styles.searchButton} onPress={() => fetchCoordinates()}>
                    <Text style={{ color: COLORS.secondary }}>Search</Text>
                </TouchableOpacity>
            </View>
            <View>
                <JobLocationSetupMap />
            </View>
            <View style={styles.buttonWrap}>

                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("SetupComplete")}>
                    <Text style={{ color: COLORS.secondary }}>Continue</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}
