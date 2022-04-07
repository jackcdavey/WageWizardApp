// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import styles from '../../styles/stylesheet.js';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Text, Switch, Image } from "react-native";

import { launchImageLibrary } from 'react-native-image-picker';


//function to get coordinates from an address search
//Account activation is pending so API requests are currently denied.
//Function is currently incomplete, object returned from promise must be handled
//and be passeed as coordinates to MapView
function getCoordinatesFromAddress({ searchtext }) {
    return new Promise((resolve) => {
        const url = 'https://geocoder.ls.hereapi.com/6.2/geocode.json?searchtext=' + '1%20Main%20Salinas%20CA' + '&&apiKey=VyBjmC6PoIXhlNzKVm5r7eWr5-qoZbWVJaSoGCUrKGw'

    })
}

export default function InitialSetupView({ navigation }) {
    var userExists = false;
    if (global.globalRealmDBUse) {
        realm = require('../../userData/realm').default;
    }

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [pin, setPin] = useState(0);

    const [usePin, setUsePin] = useState(false);
    const [useBiometric, setUseBiometric] = useState(false);
    const togglePin = () => setUsePin(!usePin);
    const toggleBiometric = () => setUseBiometric(!useBiometric);

    const setProfilePicture = () => {
        launchImageLibrary({
            noData: true,
            mediaType: 'photo',
            quality: 0.5,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        }).then(response => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                // You can also display the image using data:
                // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                // this.setState({
                //     profilePicture: source,
                // });
                console.log('Selected image uri: ' + response.assets[0].uri);
            }
        });
    }


    const submitInfo = () => {

        //Check usePin and useBiometric
        //if usePin is true, navigate to pin setup screen
        let newUser;
        try {
            if (realm) {


                realm.write(() => {
                    userExists = realm.objects('User').length > 0;

                    if (!userExists) {
                        newUser = realm.create('User', {
                            firstName: firstName,
                            lastName: lastName,
                            email: email,
                            birthday: birthday,
                            pin: pin,
                            usePin: usePin,
                            useBiometric: useBiometric
                        });
                        if (usePin) {
                            Alert.alert('Navigate to pin screen');
                            //Navigate here
                        }
                        navigation.navigate("JobSetup");
                    }
                    else {
                        Alert.alert('A user already exists, clear profile data first to create a new user.');
                    }
                });

                //Get rid of this later 
                realm.write(() => {
                    var allUsers = realm.objects('User');
                    console.log('allUsers', allUsers);
                    // Alert.alert('allUsers', JSON.stringify(allUsers));
                });
                //
            }
            else {
                Alert.alert('Realm is not defined, navigating anyway');
                navigation.navigate("JobSetup");
            }

        }
        catch (error) {
            Alert.alert('Error saving user.');
        }
    }

    const clearUsers = () => {
        try {
            if (realm) {
                realm.write(() => {
                    var allUsers = realm.objects('User');
                    realm.delete(allUsers);
                    Alert.alert('All users have been deleted.');
                });
            } else {
                Alert.alert('Realm not initialized.');
            }
        }
        catch (error) {
            Alert.alert('Error deleting users.');
        }
    }




    return (
        <View style={styles.container}>
            <View style={styles.directionsWrap}>
                <Text style={styles.title}>Welcome to Wage Wizard!</Text>
            </View>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    Please enter the information
                    below.  Required fields are
                    denoted by a red arrow. [ARROW HERE]</Text>
            </View>

            <View style={{ padding: 10 }} >
                <TouchableOpacity onPress={() => setProfilePicture()}>
                    <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3 }} />
                </TouchableOpacity>
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="First Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setFirstName(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Last Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setLastName(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholderTextColor={COLORS.lightPlaceholder} placeholder="Email Address" onChangeText={newText => setEmail(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Birthday" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setBirthday(newText)} />
            </View>
            <View style={styles.field}>
                <Text style={{ marginRight: 25 }}>Use Pin?</Text>

                <Switch
                    trackColor={{ false: COLORS.red, true: COLORS.green }}
                    onValueChange={togglePin}
                    value={usePin}
                />
            </View>
            <View style={styles.field}>
                {/* Prevent interaction until usePin is true */}
                <Text style={{ marginRight: 25 }}>Use Biometrics?</Text>

                <Switch
                    trackColor={{ false: COLORS.red, true: COLORS.green }}
                    onValueChange={toggleBiometric}
                    value={useBiometric}
                    disabled={!usePin}
                />
            </View>


            {/* <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text> */}
            {/* <TextInput style={styles.input} placeholder="Pin" /> */}
            {/* Needs to be a number import, breaking account saving */}



            <View style={styles.buttonWrap}>
                <TouchableOpacity style={styles.button} onPress={() => submitInfo()}>
                    <Text style={{ color: COLORS.secondary }}>Continue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => clearUsers()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE PROFILE DATA</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}
