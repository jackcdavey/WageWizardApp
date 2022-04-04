import { TabActions } from '@react-navigation/native';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text, Alert, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import AppLoading from 'expo-app-loading';
import Header from './elements/Header.js';

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
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error deleting users.');
    }
}

const createLog = () => {
    try {
        if (realm) {
            var allLogs = realm.objects('WorkLog');
            realm.write(() => {
                newLog = realm.create('WorkLog', {
                    logId: allLogs.length + 1,
                    jobId: -1,
                    notes: '',
                    startTime: new Date(),
                    endTime: new Date(),
                    breakCount: 0,
                    totalBreakTime: 0,
                });
                Alert.alert('New log created: ', JSON.stringify(newLog));
            });
        } else {
            Alert.alert('Realm not initialized.');
        }
    }
    catch (error) {
        Alert.alert('Error creating log.');
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
                    <Text style={{ color: COLORS.secondary }}>CREATE LOG</Text>
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