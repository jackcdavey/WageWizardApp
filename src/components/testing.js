
import { View, TouchableOpacity, Dimensions, Text, Alert, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Header from './elements/Header.js';
import styles from '../styles/stylesheet.js';
import realm from '../userData/realm.js';

import getLocation from '../hooks/getLocation';


const Tab = createBottomTabNavigator();

import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    const { isTracking } = state;
    return { isTracking };
}

const clearJobs = () => {
    try {
        if (realm) {
            clearLogs();
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
                        startTime: new Date(),
                        endTime: new Date(),
                        breakCount: 0,
                        totalBreakTime: 0,
                        //temp
                        date: new Date(),
                        time: 5,
                    });
                    Alert.alert('New log created: ', JSON.stringify(newLog));
                    console.log('New log created: ', newLog);
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


const addGeofence = () => {
    try {
        let newGeofence;
        if (realm) {
            //Just add geofences to the most recent job.
            //Will need to be dependent on the picked job.
            realm.write(() => {
                id = realm.objects('GeofenceLocation').length + 1;
                if (id != realm.objects('GeofenceLocation').length && !realm.objectForPrimaryKey('GeofenceLocation', id)) {
                    newGeofence = realm.create('GeofenceLocation', {
                        id: id,
                        jobId: 1,
                        longitude: 0.0,
                        latitude: 0.0,
                        radius: 50
                    });
                    Alert.alert('New geofence created: ', JSON.stringify(newGeofence));
                    console.log('New geofence created: ', newGeofence);
                } else {
                    Alert.alert('Geofence already exists. (idk how that is possible)');
                }
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    } catch (error) {
        Alert.alert('Error creating geofence.');
        console.log('Error creating geofence: ', error);
    }
};


const clearGeofences = () => {
    try {
        if (realm) {
            realm.write(() => {
                var allGeofences = realm.objects('GeofenceLocation');
                realm.delete(allGeofences);
                Alert.alert('All geofences have been deleted.');
                console.log('All geofences deleted.');
            });
        } else {
            console.log('Realm not initialized.');
        }
    } catch (error) {
        console.log('Error deleting geofences: ', error);
    }
}



const _TestingView = (props) => {
    const { navigation, isTracking } = props
    getLocation();
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={() => clearUsers()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE PROFILE DATA</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Setup", { screen: 'InitialSetup' })}>
                    <Text style={{ color: COLORS.secondary }}>
                        START INITIAL SETUP
                    </Text>
                </TouchableOpacity>
                {/**DO NOT CLEAR ALL JOBS WHILE USER IS TRACKING, WILL BREAK LOGIC SEVERELY */}
                {
                    isTracking
                        ?
                        <Text>Person is Tracking, do not clear jobs, will break logic</Text>
                        :
                        <TouchableOpacity style={styles.button} onPress={() => clearJobs()}>
                            <Text style={{ color: COLORS.secondary }}>DELETE ALL JOBS</Text>
                        </TouchableOpacity>
                }


                <TouchableOpacity style={styles.button} onPress={() => createLog()}>
                    <Text style={{ color: COLORS.secondary }}>CREATE EMPTY LOG</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => clearLogs()}>
                    <Text style={{ color: COLORS.secondary }}>DELETE ALL LOGS</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => addGeofence()}>
                    <Text style={{ color: COLORS.secondary }}>ADD GEOFENCE</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button} onPress={() => clearGeofences()}>
                    <Text style={{ color: COLORS.secondary }}>CLEAR GEOFENCES</Text>
                </TouchableOpacity>

            </View>
        </>
    );
}
const TestingView = connect(mapStateToProps)(_TestingView);

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





