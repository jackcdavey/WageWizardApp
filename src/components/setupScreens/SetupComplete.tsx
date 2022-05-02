import React from 'react';
import { View, TouchableOpacity, Text } from "react-native";
import styles from '../../styles/stylesheet.js';

//Eventually, the route will need to be checked to ensure this screen only appears 
//on first time setup. Currently, it is shown every time a job is added.

export default function SetupComplete({ navigation }: { navigation: any }) {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Setup Complete!</Text>
            <View style={styles.directionsWrap}>
                <Text style={styles.directions}>
                    Congratulations! You're ready to start using Wage Wizard to
                    track your work, and defend against wage theft.
                </Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Main', { screen: 'Tracking' })}>
                <Text style={styles.buttonText}>Finish</Text>
            </TouchableOpacity>
        </View>
    )
}
