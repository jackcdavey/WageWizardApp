import COLORS from '../../styles/colors.js';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../../styles/stylesheet.js';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from 'react-native';

import Header from '../elements/Header.js';
import realm from '../../userData/realm.js';


const Tab = createBottomTabNavigator();



//Account Page Content
const AcccountView = ({ navigation }) => {

  const profilePicDimensions = Dimensions.get('window').width * 0.35;

  var userExists = false;

  var firstName = 'no First Name';
  var lastName = 'no Last Name';
  var fullName = 'no Name Stuff';
  var birthday = 'no Birthday';
  var email = 'no Email';
  var jobList = [];
  var locationList = [];
  var logsList = [];

  if (realm) {
    userExists = realm.objects('User').length > 0;
    const user = realm.objects('User');
    jobList = JSON.stringify(realm.objects('Job'));
    locationList = JSON.stringify(realm.objects('GeofenceLocation'));
    logsList = JSON.stringify(realm.objects('WorkLog'));
    if (userExists) {
      //Alert.alert('There is a user in the database.');
      //Alert.alert('User: ' + user[0].firstName);

      firstName = user[0].firstName;
      lastName = user[0].lastName;
      fullName = firstName + ' ' + lastName;
      birthday = user[0].birthday;
      email = user[0].email;
    }
  } else {
    Alert.alert('Realm is not defined, navigating anyway');
  }
  //If editButtonPressed is true, then render the version of the page with the TextInputs 
  //rather than Text elements.
  //Static version of the page
  return (
    <View style={styles.container}>
      <View style={styles.profileInformationContainer}>
        <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: profilePicDimensions, maxHeight: profilePicDimensions }} />
        <View>
          <View style={styles.profileAccountInfoField}>
            <Text style={styles.profileAccountInfoText}>{fullName}</Text>
          </View>
          <View style={styles.profileAccountInfoField}>
            <Text style={styles.profileAccountInfoText}>{email}</Text>
          </View>

          <View style={styles.profileAccountInfoField}>
            <Text style={styles.profileAccountInfoText}>{birthday}</Text>
          </View>
        </View>
      </View >
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate("Setup", { screen: 'InitialSetup' })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Edit Profile
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Setup", { screen: 'JobSetup' })}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>
              Add Job
            </Text>
          </View>
        </TouchableOpacity>


      </View>

      <View style={{ maxHeight: '15%', width: '100%', alignItems: 'center', margin: '1%', justifyContent: 'flex-end' }}>
        <Text style={styles.subtitle}>Saved Jobs</Text>
        <ScrollView>
          <Text> {jobList}</Text>
        </ScrollView>
      </View>
      {/* <TouchableOpacity onPress={() => navigation.navigate("Testing")}>
        <View style={styles.testButton}>
          <Text style={styles.buttonText}>
            TESTING
          </Text>
        </View>
      </TouchableOpacity> */}




    </View>

    // </View>

  );
}


//Handles stack navigation settings for account//
export default function Account({ navigation }) {
  return (
    //Display header in here
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          display: 'none',
        },
        //For some reason touch target for account icon is too tall, abt double height
        headerRight: () => (
          <Header title="Account" />
        ),
        headerLeft: () => (
          <TouchableOpacity style={{ marginLeft: 20, paddingBottom: 5 }} onPress={() => navigation.goBack()}>
            <Image source={require('../../assets/images/icons/Back.png')} style={{ width: Dimensions.get('window').width * 0.04, maxHeight: Dimensions.get('window').width * 0.07 }} />
          </TouchableOpacity>
        ),


      })}
    >
      <Tab.Screen
        name="accountView"
        component={AcccountView}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}
