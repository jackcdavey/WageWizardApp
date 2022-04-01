import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Text } from "react-native";
import { UpdateMode } from 'realm';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
//import saveJob from '../../userData/saveJob';
//import realm from '../../userData/realm';

export default function JobSetup({ navigation }) {
    if (global.globalRealmDBUse) {
        realm = require('../../userData/realm').default;
    }

    //default values for job
    //id should be checked and auto-incremented
    const [id, setId] = useState(0);
    const [employer, setEmployer] = useState('Test Employer');
    const [client, setClient] = useState('Test Client');
    const [location, setLocation] = useState('Test Location');

    const submitInfo = () => {
        //Save job to realm here
        navigation.navigate('JobLocationSetup');
    }


    let newJob;
    try {
        if (realm) {
            realm.write(() => {
                var allJobs = realm.objects('Job');
                console.log('allJobs', allJobs);
                realm.delete(allJobs);
            });
            realm.write(() => {
                newJob = realm.create('Job', {
                    id: id,
                    employer: employer,
                    client: client,
                    location: location
                });
                console.log(newJob);
            });
        }
    } catch (error) {
        console.log(error);
    }
    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        }}>
            <View style={styles.directionsWrap}>
                <Text style={[styles.title, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Add A Job</Text>
            </View>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    Provide the information below to set up your first job. All fields are optional, but incomplete information may limit functionality.
                </Text>
            </View>
            <View>
                <TextInput style={styles.input} placeholder="Employer Name" onChangeText={newText => setEmployer(newText)} defaultValue={employer} />
            </View>

            <View>
                <TextInput style={styles.input} placeholder="Client Name" onChangeText={newText => setClient(newText)} defaultValue={client} />
            </View>
            <View>
                <TextInput style={styles.input} placeholder="City (Of Work)" onChangeText={newText => setLocation(newText)} defaultValue={location} />
                {/* this will be changed in future build */}
            </View>

            <View>
                <TextInput style={styles.input} placeholder="Other Info" />
            </View>

            <View style={styles.buttonWrap}>

                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={() => navigation.goBack()}>
                    {/* This does not properly navigate to previous screen, always returns to account page
                    even when accessed through InitialSetupView */}
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => submitInfo()}>
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
    directionsWrap: {
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
