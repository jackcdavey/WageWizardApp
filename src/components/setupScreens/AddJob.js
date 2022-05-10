import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import { View, TouchableOpacity, TextInput, Text, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";
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
    const [wage, setWage] = useState(0.0);



    if (realm) {
        //Alert.alert('There are ' + realm.objects('Job').length + ' jobs in the database.');
        //default values for job
        //id should be checked and auto-incremented
        id = realm.objects('Job').length + 1;
    }



    const submitInfo = () => {
        // //Save job to realm here
        // const color = Math.floor(Math.random() * 16777215).toString(16);
        // setJobColor('#' + color);


        navigation.navigate('JobLocationSetup');
        let newJob;
        const color = Math.floor(Math.random() * 16777215).toString(16);
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
                            wage: wage,
                            color: '#' + color
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
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                        <View style={styles.field}>
                            <Text style={styles.logItemLabel}>$</Text>
                            <TextInput style={styles.setupTextField} placeholder="Hourly Wage" keyboardType='numeric' placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setWage(parseFloat(newText))} />
                        </View>
                    </View>


                    <View style={styles.buttonWrap}>

                        <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.active }]} onPress={() => navigation.goBack()}>
                            {/* This does not properly navigate to previous screen, always returns to account page
                    even when accessed through InitialSetupView */}
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.button} onPress={() => submitInfo()}>
                            <Text style={styles.buttonText}>Continue</Text>
                        </TouchableOpacity>

                    </View>
                    {/* <TouchableOpacity style={styles.testButton} onPress={() => clearJobs()}>
                        <Text style={{ color: COLORS.secondary }}>DELETE ALL JOBS</Text>
                    </TouchableOpacity> */}


                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}



