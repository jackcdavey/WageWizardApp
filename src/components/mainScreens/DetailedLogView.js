import React from 'react';
import Header from '../elements/Header';
import { View, Text, Dimensions, Image, TouchableOpacity, Share, Alert, ScrollView } from "react-native";
import COLORS from '../../styles/colors';
import styles from '../../styles/stylesheet.js';
import realm from '../../userData/realm';

//Possibly add some sqeuomorphic styling for the log sheet?
//Animate a slide up when a user presses a log
const onShare = async () => {
    try {
        const result = await Share.share({
            message:
                '[EMPTY] Work Log PDF',
        });
        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                // shared with acivity type of result.activityType
            } else {
                // shared
            }
        } else if (result.action === Share.dismissedAction) {
            // dismissed
        }
    } catch (error) {
        alert(error.message);
    }
};




export default function DetailedLogView({ route, navigation }) {

    const deleteLog = (logId) => {
        Alert.alert('Are you sure you want to delete this log?', 'You cannot undo this action.', [{ text: 'Cancel', style: 'cancel' }, {
            text: 'Delete', style: 'destructive', onPress: () => {
                //Delete log here
                try {
                    realm.write(() => {
                        realm.delete(realm.objects('WorkLog').filtered(`id = ${logId}`));
                    });
                } catch (error) {
                    console.log(error);
                }
                console.log('Log deleted.');
                navigation.navigate('Main');
            }
        }]);
    };

    const { logId, employer, client, date, startTime, endTime, time, notes } = route.params
    let seconds = ("0" + ((time / 1) % 60)).slice(-2)
    let minutes = ("0" + (Math.floor((time / 60)) % 60)).slice(-2)
    let hours = ("0" + (Math.floor((time / 3600)) % 24)).slice(-2)
    let ampm = '';
    if (startTime.getHours() >= 12)
        ampm = "PM";
    else
        ampm = "AM";

    return (
        <>
            {/* Implement card styling here */}
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', backgroundColor: COLORS.primary, paddingTop: Dimensions.get('window').height * 0.04 }}>
                <TouchableOpacity style={{ minWidth: Dimensions.get('window').width * 0.15 }} onPress={() => navigation.goBack()}>
                    <Image source={(require('../../assets/images/icons/Back.png'))} style={{ marginLeft: 25, marginTop: 8, width: Dimensions.get('window').width * 0.04, height: Dimensions.get('window').width * 0.07 }} />
                </TouchableOpacity>
                <Header title="Details" />
            </View>
            <View style={styles.container}>
                <View style={styles.logContainer}>
                    <Text style={styles.logTitle}>
                        Job - {date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear()}
                    </Text>

                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            Employer:
                        </Text>
                        <Text style={styles.logText}>
                            {employer}
                        </Text>
                    </View>
                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            Client:
                        </Text>
                        <Text style={styles.logText}>
                            {client}
                        </Text>
                    </View>
                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            Start Time:
                        </Text>
                        <Text style={styles.logText}>
                            {startTime.getHours() % 12 + ":" + startTime.getMinutes() + ' ' + ampm}
                        </Text>
                    </View>
                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            End Time:
                        </Text>
                        <Text style={styles.logText}>
                            {endTime.getHours() % 12 + ":" + endTime.getMinutes() + ' ' + ampm}
                        </Text>
                    </View>
                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            Time Spent:
                        </Text>
                        <Text style={styles.logText}>
                            {hours} : {minutes} : {seconds}
                        </Text>

                    </View>
                    <View style={styles.logSectionContainer}>
                        <Text style={styles.logLabel}>
                            Notes:
                        </Text>
                        <ScrollView>
                            <Text style={styles.logText}>
                                {notes}
                            </Text>
                        </ScrollView>

                    </View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => onShare()}>
                        <Text style={styles.buttonText}>Export</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => deleteLog(logId)}>
                        <Text style={styles.buttonText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    );
}
