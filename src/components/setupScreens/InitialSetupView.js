// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/
import React, { useState } from 'react';
import COLORS from '../../styles/colors.js';
import styles from '../../styles/stylesheet.js';
import { View, TouchableOpacity, Alert, Dimensions, TextInput, Text, Switch, Image, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native";

import { launchImageLibrary } from 'react-native-image-picker';

import realm from '../../userData/realm.js';


//function to get coordinates from an address search
//Account activation is pending so API requests are currently denied.
//Function is currently incomplete, object returned from promise must be handled
//and be passeed as coordinates to MapView


export default function InitialSetupView({ navigation }) {
    var userExists = false;


    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [birthday, setBirthday] = useState('');
    const [pin, setPin] = useState(0); //remove later

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

    const createRealmUser = () => {
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
                            pin: pin, //Remove later here and in realm
                            usePin: usePin,
                            useBiometric: useBiometric
                        });
                        console.log('User created:', newUser);
                    } else {
                        console.log('User still exists');
                    }
                });
            }
        } catch (error) {
            console.log(error);
        }
    }

    const updateRealmUser = () => {
        userExists = realm.objects('User').length > 0;
        if (userExists) {
            realm.write(() => {
                let existingUser = realm.objects('User')[0];
                existingUser.firstName = firstName;
                existingUser.lastName = lastName;
                existingUser.email = email;
                existingUser.birthday = birthday;
                existingUser.pin = pin; //Remove later here and in realm
                existingUser.usePin = usePin;
                existingUser.useBiometric = useBiometric;
                console.log('User updated:', existingUser);
            });
        } else {
            console.log('User does not exist');
        }
    }

    const submitInfo = () => {

        //Check usePin and useBiometric
        //if usePin is true, navigate to pin setup screen
        userExists = realm.objects('User').length > 0;
        if (!userExists) {
            createRealmUser();
            if (usePin) {
                navigation.navigate('PinSetup');
            } else {
                navigation.navigate('JobSetup');
            }
        } else {
            Alert.alert('A user already exists, do you wish to overwrite account data?', 'You cannot undo this action.', [{ text: 'Cancel', style: 'cancel', onPress: () => navigation.goBack() }, {
                text: 'Overwrite', style: 'destructive', onPress: () => {
                    updateRealmUser();
                    if (usePin) {
                        navigation.navigate('PinSetup');
                    } else {
                        if (realm.objects('Job').length > 0) {
                            navigation.navigate('SetupComplete');
                        } else {
                            navigation.navigate('JobSetup');
                        }
                    }
                }
            }]);
        }

    }

    const showBackButton = () => {
        userExists = realm.objects('User').length > 0;
        if (userExists) {
            return (
                <>
                    <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={() => navigation.goBack()}>
                        <Text style={{ color: COLORS.dark }}>Back</Text>
                    </TouchableOpacity>
                </>
            );
        } else {
            return (
                <></>
            );
        }
    }

    let existingUser = realm.objects('User')[0];
    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container} >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.container}>
                    <View style={styles.directionsWrap}>
                        <Text style={styles.title}>Welcome to Wage Wizard!</Text>
                    </View>
                    <View style={styles.directionsWrap}>
                        <Text style={styles.directions}>
                            Please enter the information
                            below. Required fields are
                            marked with an arrow. </Text>
                    </View>

                    <View style={{ padding: 10 }} >
                        <TouchableOpacity onPress={() => setProfilePicture()}>
                            <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: Dimensions.get('window').width * 0.3, height: Dimensions.get('window').width * 0.3 }} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.field}>
                        <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                        <TextInput style={styles.setupTextField} placeholder="First Name" defaultValue={existingUser.firstName} placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setFirstName(newText)} />
                    </View>

                    <View style={styles.field}>
                        <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                        <TextInput style={styles.setupTextField} placeholder="Last Name" defaultValue={existingUser.lastName} placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setLastName(newText)} />
                    </View>

                    <View style={styles.field}>
                        <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                        <TextInput style={styles.setupTextField} placeholderTextColor={COLORS.lightPlaceholder} defaultValue={existingUser.email} placeholder="Email Address" onChangeText={newText => setEmail(newText)} />
                    </View>

                    <View style={styles.field}>
                        {/* <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} /> */}
                        <TextInput style={styles.setupTextField} placeholder="Birthday" placeholderTextColor={COLORS.lightPlaceholder} defaultValue={existingUser.birthday} onChangeText={newText => setBirthday(newText)} />
                    </View>
                    <View style={[styles.field, { padding: '2%' }]}>
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
                        {showBackButton()}
                        <TouchableOpacity style={styles.button} onPress={() => submitInfo()}>
                            <Text style={{ color: COLORS.secondary }}>Continue</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => clearUsers()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE PROFILE DATA</Text>
                </TouchableOpacity> */}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}
