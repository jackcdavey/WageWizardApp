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
                <Text style={styles.title}> Job Setup</Text>
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
                <TouchableOpacity style={styles.button} onPress={() => Alert.alert('This will save info and navigate')}>
                    <Text>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.secondary }]} onPress={() => navigation.goBack()}>
                    <Text>Back</Text>
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
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 15,
        margin: 12,
        borderWidth: 1,
        padding: 10,
    },
    title: {
        fontSize: 40,
        fontWeight: 'bold',

    },
    directions: {
        fontSize: 20,
        textAlign: 'center',

    },
    directionsWrap: {
        width: Dimensions.get('window').width * 0.8,
        margin: 20,
        alignItems: 'center',
    },
    buttonWrap: {
        justifyContent: 'flex-end',
    },
    button: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.1,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',

    }
});
