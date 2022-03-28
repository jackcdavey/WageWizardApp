// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import COLORS from '../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Alert, StyleSheet, Dimensions, TextInput, Text } from "react-native";
import Header from './Header';
import { NavigationContainer } from '@react-navigation/native';


export default function JobSetup({ navigation }: { navigation: any }) {
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
                <TextInput style={styles.input} placeholder="Job Title" />
            </View>

            <View>
                <TextInput style={styles.input} placeholder="Employer Name" />
            </View>
            <View>
                <TextInput style={styles.input} placeholder="City (Of Work)" />
            </View>

            <View>
                <TextInput style={styles.input} placeholder="Other Info" />
            </View>

            <View style={styles.buttonWrap}>

                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('This will save info and navigate')}>
                    <Text style={{ color: COLORS.secondary }}>Submit</Text>
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
        paddingTop: Dimensions.get('window').height * 0.3,
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
        margin: 10,
    }
});
