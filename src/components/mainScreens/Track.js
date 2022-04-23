import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { BlurView } from "@react-native-community/blur";


//import Map from '../elements/Map.js';
import Timer from '../elements/Timer'
import LocationMap from '../elements/LocationTrackingMap'

import styles from '../../styles/stylesheet';
//import JobLocationSetup from '../setupScreens/AddJobLocation';

import realm from '../../userData/realm';


//import realm from '../../userData/realm';

//var jobsLoaded = false;

import { connect } from 'react-redux';
import { setJobId, addNote } from '../../reduxLogic/actions'

const mapStateToProps = (state) => {
  const { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, jobId, note } = state;
  return { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, jobId, note };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setJobId: (jobId) => { dispatch(setJobId(jobId)) },
    addNote: (note) => { dispatch(addNote(note)) }
  }
}

const developmentView = false;


const _Tracking = (props) => {

  const { setJobId, jobId, isTracking, note } = props
  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'No Jobs', value: 9 },
    { label: 'No Jobs', value: 0 },
    { label: 'No Jobs', value: 7 },
  ]);

  /******REALM WORK LOG LOGIC************************* */
  const [logsExist, setLogsExist] = useState(realm.objects('WorkLog').length > 0)
  const [logsFromDB, setLogsFromDB] = useState([]);

  const realmWorkLogListener = () => {
    setLogsFromDB(realm.objects('WorkLog'));
    setLogsExist(realm.objects('WorkLog').length > 0)
  }
  realm.addListener("change", realmWorkLogListener)
  useEffect(() => {
    //clean up function
    return () => {
      realm.removeListener("change", realmWorkLogListener)
    }
  }, [])


  useEffect(() => {
    //set it to run only if the logs collection from mongodb is not empty
    if (logsExist) {
      setLogsFromDB(realm.objects('WorkLog'));
      //somehow jobsFromDB after this line has not data
      /*setItems(jobsFromDB.map((e)=>{
        return {label:e.employer,value:e.id}
      }))
      */
    }
  }, [logsExist])


  /******REALM JOB LOGIC ***************************** */

  const realmListener = () => {
    setJobsFromDB(realm.objects('Job'))
    //update jobsExists
    setJobsExist(realm.objects('Job').length > 0)
  }
  realm.addListener("change", realmListener)
  useEffect(() => {
    //clean up function
    return () => {
      realm.removeListener("change", realmListener)
    }
  }, [])


  const [jobsExist, setJobsExist] = useState(realm.objects('Job').length > 0)
  const [jobsFromDB, setJobsFromDB] = useState([]);

  //debug check:
  //edit* actually no, an important function needed to circumvent redux's weird dispatch rules 
  const [localJobId, setLocalJobId] = useState(jobId)

  //used to populate the item array for the dropdown picker
  useEffect(() => {
    //set it to run only if the jobs collection from mongodb is not empty
    if (jobsExist) {
      setJobsFromDB(realm.objects('Job'));
      //somehow jobsFromDB after this line has not data
      /*setItems(jobsFromDB.map((e)=>{
        return {label:e.employer,value:e.id}
      }))
      */
    }
  }, [jobsExist])

  //second function to update items in picker if jobsFromDB gets updated
  useEffect(() => {
    if (jobsFromDB.length !== 0) {
      setItems(jobsFromDB.map((e) => {
        return { label: e.employer, value: e.id }
      }))
    } else {
      //empty the items
      setItems([])
      //set the jobID back to default
    }
  }, [jobsFromDB])

  //debug function to compare the current selected job id with the job id at the global state
  //edit* not acutally a debug functiion, necessary to call setJobId indirectly outside the picker
  useEffect(() => {
    setJobId(localJobId)
  }, [localJobId])


  return (

    <View style={styles.container}>
      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}

      {
        developmentView
          ? <View>
            <Text>localJobId: {JSON.stringify(localJobId)}</Text>
            <Text>jobId (redux global state): {JSON.stringify(jobId)}</Text>
            <Text>Note: {note}</Text>
          </View>
          : <View></View>
      }

      <Timer/>
 

      {
        jobsExist

          ? <View style={{ alignItems: 'center', display: 'flex', justifyContent: 'space-evenly', height: '80%' }}>
            {

              isTracking
                ? <View style={{ display: 'flex', flexDirection: 'row', paddingBottom: '2%' }}>
                  <Text style={styles.currentJobLabel}>Currently tracking job:</Text>
                  <Text style={styles.currentJobText}> {realm.objectForPrimaryKey('Job', value).employer} </Text>
                </View>

                //If open is true, then display blur layer here

                : <DropDownPicker
                  style={styles.picker}
                  placeholder="Select a Job"
                  containerStyle={styles.pickerContainer}
                  placeholderStyle={styles.pickerLabel}
                  dropDownContainerStyle={styles.pickerDropDownContainer}
                  listItemLabelStyle={styles.pickerListItemLabel}
                  labelStyle={styles.pickerLabel}
                  itemSeparator={true}
                  open={open}
                  value={value}
                  items={items}
                  modalProps={{
                    animationType: 'slide'
                  }}
                  setOpen={setOpen}
                  setValue={setValue}
                  setItems={setItems}

                  onSelectItem={(item) => {
                    //This is where we'll record the job selection and pass to 'ActiveTracking' DB

                    setLocalJobId(item.value);
                    console.log(item);
                  }}
                //displaying the jobs:
                />

            }

            <LocationMap />
            {
              open
                ? <BlurView style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, height: Dimensions.get('window').height }} blurType="light" blurAmount={20} reducedTransparencyFallbackColor="white" />
                : <></>
            }
          </View>
          : <Text>add a job to begin tracking</Text>
      }

    </View>
  );
}

const Tracking = connect(mapStateToProps, mapDispatchToProps)(_Tracking);
export default Tracking;