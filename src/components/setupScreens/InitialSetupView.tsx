// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/

import 'react-native-gesture-handler';
import React from 'react';
import COLORS from '../../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Text } from "react-native";

export default function InitialSetupView({ navigation }: { navigation: any }) {
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
                <TextInput style={styles.input} placeholder="Full Name" />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Email Address" />
            </View>

            <View style={styles.field}>
                <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text>
                <TextInput style={styles.input} placeholder="Birthday" />
            </View>

            <View style={styles.field}>
                {/* <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text> */}
                <TextInput style={styles.input} placeholder="Pin" />
            </View>

            <View style={styles.field}>
                {/* <Text style={{ marginRight: 10, backgroundColor: 'red' }}> [ARROW]</Text> */}
                <TextInput style={styles.input} placeholder="Confirm Pin" />
            </View>

            <View style={styles.buttonWrap}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("JobSetup")}>
                    <Text style={{ color: COLORS.secondary }}>Next -- </Text>
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
