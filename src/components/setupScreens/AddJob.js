import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import { View, TouchableOpacity, Alert, TextInput, Text, Image, StyleSheet } from "react-native";
import realm from '../../userData/realm';

import styles from '../../styles/stylesheet.js';

//Eventually this will need to listen to the route –
//If the user has pushed the back button from the job location setup screen, the last 
//job should be deleted.
export default function JobSetup({ navigation }) {

    var id = -1;
    const [employer, setEmployer] = useState('Test Employer');
    const [client, setClient] = useState('Test Client');
    const [location, setLocation] = useState('Test Location');
    const [jobColor, setJobColor] = useState('#000000');

    if (realm) {
        //Alert.alert('There are ' + realm.objects('Job').length + ' jobs in the database.');
        //default values for job
        //id should be checked and auto-incremented
        id = realm.objects('Job').length + 1;
    }




    const clearJobs = () => {
        try {
            if (realm) {
                realm.write(() => {
                    var allJobs = realm.objects('Job');
                    realm.delete(allJobs);
                    Alert.alert('All jobs have been deleted.');
                    console.log('Remaining jobs: ', allJobs);

                });
            } else {
                Alert.alert('Realm not initialized.');
            }
        }
        catch (error) {
            Alert.alert('Error deleting jobs.');
        }
    }

    const submitInfo = () => {
        //Save job to realm here

        (() => {
            const color = Math.floor(Math.random() * 16777215).toString(16);
            setJobColor('#' + color);
        })();

        navigation.navigate('JobLocationSetup');
        let newJob;
        try {
            if (realm) {
                realm.write(() => {
                    id = realm.objects('Job').length + 1;
                    if (id != realm.objects('Job').length && !realm.objectForPrimaryKey('Job', id)) {
                        newJob = realm.create('Job', {
                            id: id,
                            employer: employer,
                            client: client,
                            location: location,
                            color: jobColor
                        });
                        console.log('New job created: ', JSON.stringify(newJob));
                    } else {
                        console.log('Job already exists.');
                    }



                });
            }
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <View style={styles.container}>
            <View style={styles.directionsWrap}>
                <Text style={[styles.title, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Add A Job</Text>
            </View>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    Provide the information below to set up your first job.
                </Text>
            </View>

            <View>
                <View style={styles.field}>
                    <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                    <TextInput style={styles.setupTextField} placeholder="Employer Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setEmployer(newText)} />
                </View>

                <View style={styles.field}>

                    <TextInput style={styles.setupTextField} placeholder="Client Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setClient(newText)} />
                </View>
                <View style={styles.field}>
                    <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                    <TextInput style={styles.setupTextField} placeholder="City (Of Work)" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setLocation(newText)} />
                    {/* this will be changed in future build */}
                </View>

                <View>
                    <TextInput style={styles.setupTextField} placeholder="Other Info" placeholderTextColor={COLORS.lightPlaceholder} />
                </View>
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
            <TouchableOpacity style={styles.testButton} onPress={() => clearJobs()}>
                <Text style={{ color: COLORS.secondary }}>DELETE ALL JOBS</Text>
            </TouchableOpacity>


        </View>
    )
}



