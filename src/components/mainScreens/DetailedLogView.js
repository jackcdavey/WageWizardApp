// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/
import React from 'react';
import Header from '../elements/Header';
import { View, Text, StyleSheet, Dimensions, Alert, Image, TouchableOpacity } from "react-native";
import COLORS from '../../styles/colors';
import { produceWithPatches } from 'immer';


// const getDetailedLog = (props) => {
//     const id = props.route.params.id;




//Possibly add some sqeuomorphic styling for the log sheet?
//Animate a slide up when a user presses a log
export default function DetailedLogView({route,navigation}) {
    const {employer,client,date,time,notes} = route.params
    let seconds = ("0" + ((time / 1) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
    let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)
    //console.log("DetailedLogView props: ", props.logId);
    return (
        <>
            
            {/* Implement card styling here */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.primary, paddingTop: Dimensions.get('window').height * 0.04 }}>
                <TouchableOpacity style={{ minWidth: Dimensions.get('window').width * 0.15 }} onPress={() => navigation.goBack()}>
                    <Image source={(require('../../assets/images/icons/Back.png'))} style={{ marginLeft: 25, marginTop: 8, width: Dimensions.get('window').width * 0.04, height: Dimensions.get('window').width * 0.07 }} />
                </TouchableOpacity>
                <Header title="Details" />
            </View>

            {/*This is all temporary data for prototyping purposes. Eventually logs will be 
            pulled from the realm db located in src/userData */}
            <View style={styles.logContainer}>
                <Text style={styles.logTitle}>
                    Job - {date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()}
                </Text>

                <View style={styles.textWrap}>
                    <Text style={styles.logLabel}>
                        Employer:
                    </Text>
                    <Text style={styles.logText}>
                        {employer}
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.logLabel}>
                        Client:
                    </Text>
                    <Text style={styles.logText}>
                        {client}
                    </Text>
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.logLabel}>
                        Time Spent:
                    </Text>
                    <Text style={styles.logText}>
                        {hours} : {minutes} : {seconds}
                    </Text>
                    
                </View>
                <View style={styles.textWrap}>
                    <Text style={styles.logLabel}>
                        Notes:
                    </Text>
                    <Text style={styles.logText}>
                        {notes}
                    </Text>
                    
                </View>

            </View>
            <View style={styles.buttonWrap}>

                <TouchableOpacity style={styles.button} onPress={() => Alert.alert("This will summon the OS sharesheet")}>
                    <Text style={{ color: COLORS.secondary }}>Export</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    logContainer: {
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.7,
        margin: 20,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logTitle: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.dark,
        textAlign: 'center',
    },
    logText: {
        fontSize: 18,
        color: COLORS.dark,
        textAlign: 'right',
    },
    logLabel: {
        fontSize: 18,
        color: COLORS.dark,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 10,
    },
    textWrap: {
        width: Dimensions.get('window').width * 0.8,
        minHeight: Dimensions.get('window').height * 0.05,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderColor: COLORS.dark,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
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
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'center',
        //paddingTop: Dimensions.get('window').height * 0.3,
        //This is a temp fix to force the buttons to be on the bottom of the screen
        //Content is cut off at some screen sizes, but "flex-end" doesn't work
    },
});