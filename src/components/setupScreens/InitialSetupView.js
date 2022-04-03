// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/

import 'react-native-gesture-handler';
import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Text } from "react-native";

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
    const [useBiometric, setUseBiometric] = useState(false);

    const submitInfo = () => {

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
                            useBiometric: useBiometric
                        });
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
        <View style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        }}>
            <View style={styles.directionsWrap}>
                <Text style={[styles.title, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Welcome to Wage Wizard!</Text>
            </View>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    Please enter the information
                    below.  Required fields are
                    denoted by a red arrow. [ARROW HERE]</Text>
            </View>
            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="First Name" onChangeText={newText => setFirstName(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Last Name" onChangeText={newText => setLastName(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Email Address" onChangeText={newText => setEmail(newText)} />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Birthday" onChangeText={newText => setBirthday(newText)} />
            </View>

            <View style={styles.field}>
                {/* <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text> */}
                <TextInput style={styles.input} placeholder="Pin" />
                {/* Needs to be a number import, breaking account saving */}
            </View>

            <View style={styles.field}>
                {/* <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text> */}
                <TextInput style={styles.input} placeholder="Confirm Pin" />
            </View>

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

const styles = StyleSheet.create({

    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.9,

    },
    input: {
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 15,
        margin: 10,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: 40,
        color: COLORS.dark,
        textAlign: 'center',
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
