import COLORS from '../../styles/colors.js';
import React, { useState, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import styles from '../../styles/stylesheet.js';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
  FlatList,
  Modal,
  TextInput,
  KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard,
  ScrollView,
} from 'react-native';
import { BlurView } from "@react-native-community/blur";

import Header from '../elements/Header.js';
import realm from '../../userData/realm.js';
import AdditionalGeofenceSetup from '../setupScreens/AdditionalGeofenceSetup.js';


const Tab = createBottomTabNavigator();




//Account Page Content
function AcccountView({ navigation }) {

  const [editingId, setEditingId] = useState(1);
  const [jobsExist, setJobsExist] = useState(realm.objects('Job').length > 0)
  const [jobList, setJobList] = useState([]);
  const [items, setItems] = useState([]);

  const [employer, setEmployer] = useState('Test Employer');
  const [client, setClient] = useState('Test Client');
  const [location, setLocation] = useState('Test Location');
  const [jobColor, setJobColor] = useState('#000000');



  const [editJobModalVisible, setEditJobModalVisible] = useState(false);

  const [geofences, setGeofences] = useState([])
  useEffect(() => {
    setGeofences(realm.objects("GeofenceLocation").filtered("jobId =" + editingId))
  }, [editingId])


  const deleteJob = (jobId) => {
    Alert.alert('Are you sure you want to delete this job?', 'You cannot undo this action.', [{ text: 'Cancel', style: 'cancel' }, {
      text: 'Delete', style: 'destructive', onPress: () => {
        //Delete job here
        try {
          realm.write(() => {
            realm.delete(realm.objects('Job').filtered(`id = ${jobId}`));
          });
        } catch (error) {
          console.log(error);
        }
        console.log('Job deleted.');
        Alert.alert('Job deleted.');
        setEditJobModalVisible(false);
      }
    }]);
  };

  useEffect(() => {
    //set it to run only if the logs collection from mongodb is not empty
    if (jobsExist) {
      setJobList(realm.objects('Job'));
      //somehow jobsFromDB after this line has not data
      /*setItems(jobsFromDB.map((e)=>{
        return {label:e.employer,value:e.id}
      }))
      */
    }
  }, [jobsExist])



  useEffect(() => {
    if (jobList.length > 0) {
      setItems(jobList.map((e) => {
        return ({
          key: e.id,
          employer: e.employer,
          client: e.client,
          location: e.location,
          color: e.color,
        })

      }))
    } else {
      //empty the items
      setItems([])
      //set the jobID back to default
    }
  }, [jobList])


  const profilePicDimensions = Dimensions.get('window').width * 0.35;

  var userExists = false;

  var firstName = 'no First Name';
  var lastName = 'no Last Name';
  var fullName = 'no Name Stuff';
  var birthday = 'no Birthday';
  var email = 'no Email';
  //var jobList = [];
  // var locationList = [];
  // var logsList = [];

  var btnPadding = 0;

  if (realm) {
    userExists = realm.objects('User').length > 0;
    const user = realm.objects('User');
    // jobList = JSON.stringify(realm.objects('Job'));
    // locationList = JSON.stringify(realm.objects('GeofenceLocation'));
    // logsList = JSON.stringify(realm.objects('WorkLog'));
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
  //let editingJob = realm.objects('Job')[editingId];

  const editJob = x => {
    setEditingId(x);
    let selectedJob = realm.objectForPrimaryKey('Job', x);
    setEmployer(selectedJob.employer);
    setClient(selectedJob.client);
    setLocation(selectedJob.location);
    setJobColor(selectedJob.color);
    setEditJobModalVisible(true);
  }

  const submitInfo = () => {

    //Check usePin and useBiometric
    //if usePin is true, navigate to pin setup screen
    let selectedJob = realm.objectForPrimaryKey('Job', editingId);
    if (selectedJob) {
      realm.write(() => {
        selectedJob.employer = employer;
        selectedJob.client = client;
        selectedJob.location = location;
        selectedJob.color = jobColor;
      });
      console.log('Job updated: ', selectedJob);
    }
    setEditJobModalVisible(false);
  }

  //const profilePicLocation = realm.objects("User")[0].profilePictureLocation;

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

      <View style={{ maxHeight: '40%', width: '100%', alignItems: 'center', margin: '1%', justifyContent: 'flex-end' }}>
        <Text style={styles.subtitle}>Saved Jobs</Text>


        <FlatList
          data={items}

          renderItem={({ item }) =>
            <TouchableOpacity onPress={() => editJob(item.key)}>
              <View style={[styles.jobItemButton, { borderColor: item.color, shadowColor: item.color }]}>
                <Text style={styles.logItemLabel}>{item.key}</Text><Text style={styles.logItemLabel}>{item.employer} </Text>
                <Image source={require('../../assets/images/icons/Pencil.png')} style={{ width: Dimensions.get('window').width * 0.07, height: Dimensions.get('window').width * 0.07 }}></Image>
              </View>
            </TouchableOpacity>}
        />


      </View>

      <TouchableOpacity onPress={() => navigation.navigate("Testing")}>
        <View style={styles.testButton}>
          <Text style={styles.buttonText}>
            Settings
          </Text>
        </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editJobModalVisible}
        onRequestClose={() => {
          setEditJobModalVisible(false);
        }}
      >
        <View style={styles.modalCardContainer}>

          <BlurView
            style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
            blurType="regular"
            blurAmount={20}
            reducedTransparencyFallbackColor="white"
          />
          <View style={styles.jobEditContainer}>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              <View >


                <Text style={styles.subtitle}>Editing Job: {editingId}</Text>

                <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ alignItems: 'center' }} >
                  <TouchableWithoutFeedback onPress={Keyboard.dismiss}>


                    <View>
                      <View style={styles.field}>
                        <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                        <TextInput style={styles.setupTextField} defaultValue={employer} placeholder="Employer Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setEmployer(newText)} />
                      </View>

                      <View style={styles.field}>

                        <TextInput style={styles.setupTextField} defaultValue={client} placeholder="Client Name" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setClient(newText)} />
                      </View>
                      <View style={styles.field}>
                        <Image source={require('../../assets/images/icons/FieldArrow.png')} style={styles.arrowContainer} />
                        <TextInput style={styles.setupTextField} defaultValue={location} placeholder="City (Of Work)" placeholderTextColor={COLORS.lightPlaceholder} onChangeText={newText => setLocation(newText)} />
                        {/* this will be changed in future build */}
                      </View>

                      <View>
                        <TextInput style={styles.setupTextField} placeholder="Other Info" placeholderTextColor={COLORS.lightPlaceholder} />
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </KeyboardAvoidingView>


                <View style={{ width: '100%', alignItems: 'center', margin: '1%', justifyContent: 'flex-end' }}>
                  <Text style={styles.subtitle}>Saved Worksites:</Text>

                  {geofences.map((geofence, index) => {
                    let count = index + 1;

                    return (
                      <TouchableOpacity key={count} onPress={() => Alert.alert(JSON.stringify(geofence))}>
                        <View style={styles.logItemButton}>
                          <Text style={styles.logItemLabel}>{count + JSON.stringify(geofence)}</Text>
                        </View>
                      </TouchableOpacity>
                    )

                  },
                  )}


                </View>

                <TouchableOpacity onPress={() => Alert.alert(JSON.stringify(geofences))}>
                  <View style={styles.logItemButton}>
                    <Text style={styles.logItemLabel}>{JSON.stringify(geofences)}</Text>
                  </View>
                </TouchableOpacity>


                {/* NOTE:
                Currently, the editingJobId value is not passed to the JobLocationSetup screen,
                and new geofences will always be added to the newest job.
                
                To fix this, either the joblocationsetup screen will need to be modified, or a separate
                secondary location setup / edit screen will need to be created. 
                */}



                <View style={[styles.buttonWrap, { paddingBottom: Dimensions.get('window').height * 0.2 - (geofences.length * Dimensions.get('window').height * 0.05) }]}>
                  <TouchableOpacity style={[styles.button, { width: '50%' }]} onPress={() => {
                    setEditJobModalVisible(false)
                    navigation.navigate('addGeofenceView', { jobId: editingId })
                  }}>
                    <Text style={styles.buttonText}>New Worksite</Text>
                  </TouchableOpacity>
                </View>
              </View>

              <View style={[styles.buttonWrap, { minHeight: '10%' }]}>
                <TouchableOpacity style={[styles.button, { backgroundColor: COLORS.active }]} onPress={() => setEditJobModalVisible(false)}>
                  <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => submitInfo()}>
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </View>
              <View style={[styles.buttonWrap, { minHeight: '20%', margin: 0 }]}>
                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={() => deleteJob(editingId)}>
                  <Text style={styles.buttonText}>Delete Job</Text>
                </TouchableOpacity>
              </View>

            </ScrollView>
          </View>

        </View>


      </Modal>




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
      <Tab.Screen
        name="addGeofenceView"
        component={AdditionalGeofenceSetup}
        options={{
          tabBarStyle: { display: 'none' },
        }}
      />
    </Tab.Navigator>
  );
}
