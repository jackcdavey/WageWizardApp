import React from 'react';
import { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

//import Map from '../elements/Map.js';
import Timer from '../elements/Timer'
import LocationMap from '../elements/LocationTrackingMap'

import styles from '../../styles/stylesheet';
//import JobLocationSetup from '../setupScreens/AddJobLocation';

import realm from '../../userData/realm';


//import realm from '../../userData/realm';

//var jobsLoaded = false;

import { connect } from 'react-redux';
import { setJobId } from '../../reduxLogic/actions'

const mapStateToProps = (state) => {
  const { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob, jobId } = state;
  return { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob, jobId };
}
const mapDispatchToProps = (dispatch) => {
  return {
    setJobId: (jobId) => { dispatch(setJobId(jobId)) }
  }
}

const debugInfo = true;
const showTimer = true;

const _Tracking = (props) => {

  const { setJobId, jobId, isTracking } = props
  const [open, setOpen] = useState(false);
  //Something messy going on with setValue being passed to the dropdown picker,
  //triggering warnings in editor but not in app.
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: 'No Jobs', value: 9 },
    { label: 'No Jobs', value: 0 },
    { label: 'No Jobs', value: 7 },
  ]);

  //Eventually, we'll want pressing "Start" to trigger an animation that adjusts screen elements to fit
  //the note section and remove job selection, but a temp workaround is to just to add a "TrackActive" screen
  //with proper elements.

  /*if (realm && !jobsLoaded) {
    const jobExists = realm.objects('Job').length > 0;
    if (jobExists) {
      const allJobs = realm.objects('Job');
      const numJobs = allJobs.length;
      const jobList = [];

      for (let Job of allJobs) {
        const a = { label: Job.employer, value: Job.id };
        jobList.push({ label: Job.employer, value: Job.id });
        //Still not working
        //This position should technically cause only the last job to be displayed, but that doesnt work either...

        //{ () => setItems(items => ({ ...items, label: Job.employer, value: Job.id })) };
      }

      //console.log('label: ' + jobList[0].label);
      //console.log('value: ' + jobList[0].value);

      console.log('Jobs in picker: ' + JSON.stringify(jobList));
      //console.log('Job options for tracking: ', JSON.stringify(allJobs));

      //setItems(Job.name);
      jobsLoaded = true;
    }
  }*/

  //setItems([{ label: 'No Jobs', value: -5 },]);

  /*const jobsUpdate = realm.objects("Job");
  realm.addListener((jobs,changes)=>{
    setJobsFromDB(realm.objects("Job"))
  })*/

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



  //sample jobs for testing purposes, will be discarded
  const generateIDInt = () => {
    return Math.floor(Math.random() * 100000);
  }

  //no longer async, had to remove them to get rid of memory leaks
  //fucntions for temporary development testing, functions will be removed after development

  const addJob1 = () => {
    //locations are nobili, and scdi
    let jobId = realm.objects("Job").length + 1
    let job = {
      id: jobId,
      employer: "Kyle",
      client: "StarBucks",
      location: "test location",
      color: 'rgba(245, 40, 145, 0.35)'
    }
    let locId1 = realm.objects("GeofenceLocation").length + 1
    let loc1 = {
      id: locId1,
      jobId: jobId,
      latitude: 37.348899,
      longitude: -121.942312,
      radius: 30
    }
    let locId2 = realm.objects("GeofenceLocation").length + 2
    let loc2 = {
      id: locId2,
      jobId: jobId,
      latitude: 37.349036,
      longitude: -121.938545,
      radius: 30
    }
    realm.write(() => {
      realm.create("Job", job)
      realm.create("GeofenceLocation", loc1)
      realm.create("GeofenceLocation", loc2)
    })
  }

  const addJob2 = () => {
    //locations are heafey and benson
    let jobId = realm.objects("Job").length + 1
    let job = {
      id: jobId,
      employer: "Jack",
      client: "StarBucks",
      location: "test location",
      color: 'rgba(245, 40, 145, 0.35)'
    }
    let locId1 = realm.objects("GeofenceLocation").length + 2
    let loc1 = {
      id: locId1,
      jobId: jobId,
      latitude: 37.347578,
      longitude: -121.939423,
      radius: 40
    }
    let locId2 = realm.objects("GeofenceLocation").length + 1
    let loc2 = {
      id: locId2,
      jobId: jobId,
      latitude: 37.349090,
      longitude: -121.939589,
      radius: 30
    }
    realm.write(() => {
      realm.create("Job", job)
      realm.create("GeofenceLocation", loc1)
      realm.create("GeofenceLocation", loc2)
    })
  }

  const addJob3 = () => {
    //locations are casa
    let jobId = realm.objects("Job").length + 1
    let job = {
      id: jobId,
      employer: "Brett",
      client: "StarBucks",
      location: "test location",
      color: 'rgba(245, 40, 145, 0.35)'
    }
    let locId1 = realm.objects("GeofenceLocation").length + 1
    let loc1 = {
      id: locId1,
      jobId: jobId,
      latitude: 37.379903,
      longitude: -121.851886,
      radius: 30
    }
    realm.write(() => {
      realm.create("Job", job)
      realm.create("GeofenceLocation", loc1)
    })
  }

  // const [showWorkLogs, setShowWorkLogs] = useState(false)
  // const [showWorkLogsText, setShowWorkLogsText] = useState('show work logs')
  // const showWorkLogButton = () => {
  //   if (showWorkLogs) {
  //     setShowWorkLogsText('show work logs')
  //     setShowWorkLogs(false)
  //   }
  //   else {
  //     setShowWorkLogsText('hide work logs')
  //     setShowWorkLogs(true)
  //   }
  // }



  return (

    <View style={styles.container}>
      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}

      {/*development testing buttons for testing geofences*/}
      {/* <TouchableOpacity onPress={addJob1}>
        <Text>Add Job of Type 1</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addJob2}>
        <Text>Add Job of Type 2</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={addJob3}>
        <Text>Add Job of Type 3</Text>
      </TouchableOpacity> */}
      {showTimer
        ? <Timer />
        : <View></View>
      }
      {/* 
      {
        debugInfo
          ?
          <View>
            <Text>localJobId: {JSON.stringify(localJobId)}</Text>
            <Text>jobId (redux global state): {JSON.stringify(jobId)}</Text>
          </View>
          : <View></View>
      }


      <TouchableOpacity onPress={showWorkLogButton}>
        <Text>{showWorkLogsText}</Text>
      </TouchableOpacity>
      {
        showWorkLogs
          ? <View>
            <Text>worklogs: {JSON.stringify(logsFromDB)}</Text>
          </View>
          : <View></View>
      } */}




      {
        jobsExist

          ? <View style={{ alignItems: 'center' }}>
            {

              isTracking
                ? <Text>Currently tracking job: {realm.objectForPrimaryKey('Job', value).employer} </Text>
                : <DropDownPicker
                  style={styles.picker}
                  placeholder="Select a Job"
                  containerStyle={styles.pickerContainer}
                  placeholderStyle={styles.pickerLabel}
                  labelStyle={styles.pickerLabel}
                  itemSeparator={true}
                  open={open}
                  value={value}
                  items={items}
                  setOpen={setOpen}
                  //Still seems to work properly despite undeclared setValue property warning
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
          </View>
          : <Text>add a job to begin tracking</Text>
      }

    </View>
  );
}

const Tracking = connect(mapStateToProps, mapDispatchToProps)(_Tracking);
export default Tracking;