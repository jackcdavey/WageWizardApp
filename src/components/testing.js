import { TabActions } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Alert, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AppLoading from 'expo-app-loading';
import Header from './elements/Header.js';
import { addGeofence, clearGeofences } from '../userData/geofences.js';

const Tab = createBottomTabNavigator();

const clearJobs = () => {
    try {
        if (realm) {
            realm.write(() => {
                var allJobs = realm.objects('Job');
                realm.delete(allJobs);
                Alert.alert('All jobs have been deleted.');
                console.log('Remaining jobs: ', allJobs);

            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error deleting jobs.');
    }
}

const clearUsers = () => {
    try {
        if (realm) {
            realm.write(() => {
                var allUsers = realm.objects('User');
                realm.delete(allUsers);
                Alert.alert('All users have been deleted.');
                console.log('All users have been deleted: ', allUsers);
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error deleting users.');
        console.log('Error deleting users: ', error);
    }
}

const clearLogs = () => {
    try {
        if (realm) {
            realm.write(() => {
                var allLogs = realm.objects('WorkLog');
                realm.delete(allLogs);
                Alert.alert('All logs have been deleted.');
                console.log('All logs have been deleted: ', allLogs);
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error deleting logs.');
        console.log('Error deleting logs: ', error);
    }
}


const createLog = () => {
    var newLogId = -1;
    try {
        if (realm) {
            var allLogs = realm.objects('WorkLog');
            newLogId = allLogs.length + 1;
            realm.write(() => {
                if (newLogId != allLogs.length && !realm.objectForPrimaryKey('WorkLog', newLogId)) {
                    newLog = realm.create('WorkLog', {
                        id: newLogId,
                        jobId: 1,
                        notes: '',
                        startTime: 1,
                        endTime: 5,
                        breakCount: 0,
                        totalBreakTime: 0,
                    });
                    Alert.alert('New log created: ', JSON.stringify(newLog));
                } else {
                    Alert.alert('Log already exists. (idk how that is possible)');
                }
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error creating log.');
        console.log('Error creating log: ', error);
    }
}



const TestingView = ({ navigation }) => {
    if (global.globalRealmDBUse) {
        realm = require('../userData/realm').default;

    }


    return (
        <>
            <View>

                <TouchableOpacity style={styles.btn} onPress={() => clearUsers()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE PROFILE DATA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate("Setup", { screen: 'InitialSetup' })}>
                    <Text style={{ color: COLORS.secondary }}>
                        START INITIAL SETUP
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => clearJobs()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE ALL JOBS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => createLog()}>
                    <Text style={{ color: COLORS.secondary }}>CREATE EMPTY LOG</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => clearLogs()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE ALL LOGS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => addGeofence()}>
                    <Text style={{ color: COLORS.secondary }}>ADD GEOFENCE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => clearGeofences()}>
                    <Text style={{ color: COLORS.secondary }}>CLEAR GEOFENCES</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}

export default function Testing({ navigation }) {

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                headerStyle: {
                    backgroundColor: 'red',
                },
                headerTitleStyle: {
                    display: 'none',
                },
                headerRight: () => (
                    <Header title="TESTING" />
                ),
                headerLeft: () => (
                    <TouchableOpacity style={{ marginLeft: 20, paddingBottom: 5 }} onPress={() => navigation.goBack()}>
                        <Image source={require('../assets/images/icons/Back.png')} style={{ width: Dimensions.get('window').width * 0.04, maxHeight: Dimensions.get('window').width * 0.07 }} />
                    </TouchableOpacity>
                ),
            })}
        >
            <Tab.Screen
                name="testingView"
                component={TestingView}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}




const styles = StyleSheet.create({
    infoTxt: {
        fontSize: 50,
    },
    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.6,

    },
    input: {
        width: Dimensions.get('window').width * 0.5,
        borderRadius: 15,
        margin: 10,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
    },
    info: {
        margin: 25,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderWidth: 2,
        alignItems: 'center',
    },
    btn: {
        margin: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.06,
    },
    item: {
        margin: 25,
        padding: 10,
        color: COLORS.dark,
        fontSize: 20,
        height: 44,
        fontWeight: 'bold',
    },
    testBtn: {
        margin: 25,
        backgroundColor: 'red',
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width * 0.4,
        height: Dimensions.get('window').height * 0.06,
    },
});