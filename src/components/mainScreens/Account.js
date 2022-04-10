import COLORS from '../../styles/colors.js';
import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../../styles/stylesheet.js';
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

import Header from '../elements/Header.js';

import realm from '../../userData/realm.js';


const Tab = createBottomTabNavigator();



//Account Page Content
const AcccountView = ({ navigation }) => {

  const profilePicDimensions = Dimensions.get('window').width * 0.35;

  var userExists = false;
  const [isEditing, setIsEditing] = useState(false);

  var firstName = 'no First Name';
  var lastName = 'no Last Name';
  var fullName = 'no Name Stuff';
  var birthday = 'no Birthday';
  var email = 'no Email';
  var jobList = [];
  var locationList = [];

  if (realm) {
    userExists = realm.objects('User').length > 0;
    const user = realm.objects('User');
    jobList = JSON.stringify(realm.objects('Job'));
    locationList = JSON.stringify(realm.objects('GeofenceLocation'));
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
  if (!isEditing) {
    //Static version of the page
    return (
      <View style={styles.container}>
        <View style={styles.profileInformationContainer}>
          <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: profilePicDimensions, maxHeight: profilePicDimensions }} />
          <View>
            <View style={styles.profileAccountInfoField}>
              <Text style={styles.input}>{fullName}</Text>
            </View>
            <View style={styles.profileAccountInfoField}>
              <Text style={styles.input}>{email}</Text>
            </View>

            <View style={styles.profileAccountInfoField}>
              <Text style={styles.input}>{birthday}</Text>
            </View>
          </View>
        </View >
        <Text style={styles.title}>Saved Jobs</Text>
        <Text> {jobList}</Text>
        <Text style={styles.title}>Saved Locations</Text>
        <Text> {locationList}</Text>
        <TouchableOpacity onPress={() => setIsEditing(true)}>
          <View style={styles.button}>
            <Text style={{ margin: 5, padding: 10, color: COLORS.light, fontSize: 20, height: 44, fontWeight: 'bold', }}>
              Edit
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Setup")}>
          <View style={styles.button}>
            <Text style={{ margin: 5, padding: 10, color: COLORS.light, fontSize: 20, height: 44, fontWeight: 'bold', }}>
              Add New Job
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Testing")}>
          <View style={styles.testButton}>
            <Text style={styles.item}>
              TESTING
            </Text>
          </View>
        </TouchableOpacity>

      </View>

      // </View>

    );
  } else {

    //Editable version of the page

    //IMPORTANT
    //This:
    //  - will need to be updated as the static version is updated.
    //  - does not currently update user info
    //  
    //There is definitely a better way to do this.
    //
    return (
      <View>
        <View style={{ flexDirection: 'row', paddingTop: 25 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', paddingLeft: 20, paddingTop: 20 }}>
            <TouchableOpacity onPress={() => Alert.alert("Edit Profile Picture")}>
              <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: 145, maxHeight: 145 }} />
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.field}>
              <TextInput style={styles.input} placeholder="Full Name" defaultValue={fullName} />
            </View>
            <View style={styles.field}>
              <TextInput style={styles.input} placeholder="Email Address" defaultValue={email} />
            </View>

            <View style={styles.field}>
              <TextInput style={styles.input} placeholder="Birthday" defaultValue={birthday} />
            </View>
          </View>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <TouchableOpacity onPress={() => setIsEditing(false)}>
            <View style={styles.btn}>
              <Text style={{ margin: 5, padding: 10, color: COLORS.light, fontSize: 20, height: 44, fontWeight: 'bold', }}>
                Done Editing
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={{ justifyContent: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={[styles.infoTxt, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Saved Jobs</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Setup")}>
            <View style={styles.btn}>
              <Text style={{
                margin: 5,
                padding: 10,
                color: COLORS.light,
                fontSize: 20,
                height: 44,
                fontWeight: 'bold',
              }}>
                Add New Job
              </Text>
            </View>
          </TouchableOpacity>


          <TouchableOpacity onPress={() => navigation.navigate("Setup", { screen: 'InitialSetup' })}>
            <View style={styles.testBtn}>
              <Text style={styles.item}>
                [SETUP]
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
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


// const styles = StyleSheet.create({
//   infoTxt: {
//     fontSize: 50,
//   },
//   field: {
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: Dimensions.get('window').width * 0.6,

//   },
//   input: {
//     width: Dimensions.get('window').width * 0.5,
//     borderRadius: 15,
//     margin: 10,
//     borderColor: COLORS.primary,
//     backgroundColor: COLORS.secondary,
//     borderWidth: 2,
//     padding: 10,
//     alignItems: 'center',
//   },
//   info: {
//     margin: 25,
//     backgroundColor: COLORS.secondary,
//     borderRadius: 15,
//     borderWidth: 2,
//     alignItems: 'center',
//   },
//   btn: {
//     margin: 25,
//     backgroundColor: COLORS.primary,
//     borderRadius: 15,
//     borderColor: COLORS.primary,
//     borderWidth: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: Dimensions.get('window').width * 0.4,
//     height: Dimensions.get('window').height * 0.06,
//   },
//   item: {
//     margin: 25,
//     padding: 10,
//     color: COLORS.dark,
//     fontSize: 20,
//     height: 44,
//     fontWeight: 'bold',
//   },
//   testBtn: {
//     margin: 25,
//     backgroundColor: 'red',
//     borderRadius: 15,
//     borderColor: COLORS.primary,
//     borderWidth: 2,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: Dimensions.get('window').width * 0.4,
//     height: Dimensions.get('window').height * 0.06,
//   },
// });