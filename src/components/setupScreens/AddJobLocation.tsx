import React from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, StyleSheet, Dimensions, TextInput, Text } from "react-native";
import Map from '../elements/Map.js';


let searchtext = '500 El Camino Real San Jose CA';
function getCoordinatesFromAddress(searchtext: string) {
    return new Promise((resolve) => {
        const txt = JSON.stringify(searchtext);
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

async function fetchCoordinates(searchtext: string) {
    const coordinates = await getCoordinatesFromAddress(searchtext);
    console.log('Coordinates: ' + JSON.stringify(coordinates));
}


//const responseCoordinates = await getCoordinatesFromAddress(searchtext);
//console.log('Coordinates of searchtext: ' + JSON.stringify(responseCoordinates));


export default function JobLocationSetup({ navigation }: { navigation: any }) {
    //fetchCoordinates(searchtext);
    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        }}>
            <View style={styles.container}>
                <Text style={[styles.title, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Add A Job</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.directions}>
                    To configure automatic tracking,
                    adjust the cicle below until your
                    place of work is inside.
                </Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder="Search Address..." placeholderTextColor={COLORS.lightPlaceholder} />
            </View>
            <View style={styles.container}>
                <Map />
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

const styles = StyleSheet.create({
    article: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.2,
        margin: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
    },
    item: {
        margin: 25,
        padding: 10,
        backgroundColor: COLORS.active,
        fontSize: 18,
        height: 44,
    },
    input: {
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 15,
        marginTop: 20,
        backgroundColor: COLORS.secondary,
        borderColor: COLORS.primary,
        borderWidth: 2,
        padding: 10,
    },
    title: {
        fontSize: 40,
        color: COLORS.dark,
    },
    directions: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        color: COLORS.dark,
    },
    container: {
        width: Dimensions.get('window').width * 0.8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //paddingTop: Dimensions.get('window').height * 0.3,
        //This is a temp fix to force the buttons to be on the bottom of the screen
        //Content is cut off at some screen sizes, but "flex-end" doesn't work
    },
    button: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.1,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    }
});
