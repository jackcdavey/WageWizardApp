
import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
//import realm from '../../userData/realm';
import COLORS from "../../styles/colors.js";
import styles from "../../styles/stylesheet.js";
import realm from '../../userData/realm';




export default function PinSetup({ navigation }: { navigation: any }) {
    const submitInfo = () => {
        if (realm.objects('Job').length > 0) {
            navigation.navigate('SetupComplete');
        } else {
            navigation.navigate('JobSetup');
        }
        // let newPin;
        // try {
        //     if (realm) {
        //         realm.write(() => {
        //             newPin = realm.create('', {

        //             });
        //             console.log('User Pin Set.');
        //         });
        //     }  else {
        //                 console.log('User Pin not Set');
        //             }
        // } catch (error) {
        //     console.log(error);
        // }
    }

    return (
        <>
            <View style={styles.container}>

                <Text style={styles.subtitle}>
                    The pin setup component will be added here.
                </Text>
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
        </>
    );
}