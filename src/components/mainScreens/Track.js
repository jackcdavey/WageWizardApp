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
import {ObjectId} from 'bson'

//import realm from '../../userData/realm';

var jobsLoaded = false;

import { connect } from 'react-redux';
import { setJobId } from '../../reduxLogic/actions'

const mapStateToProps = (state, props) => {
  const { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob, jobId } = state;
  return { isIdle, isRunning, isPaused, region, isInsideGeofence, isTracking, selectedJob, jobId };
}
const mapDispatchToProps = (dispatch, props) => {
  return {
    setJobId: (jobId)=>{dispatch(setJobId(jobId))}
  }
}

const debugInfo = false;
const showTimer = true;

const _Tracking = (props) => {

  const {setJobId,jobId} = props
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

  const realmListener = ()=>{
    setJobsFromDB(realm.objects('Job'))
    //update jobsExists
    setJobsExist(realm.objects('Job').length>0)
  }
  realm.addListener("change",realmListener)
  useEffect(()=>{
    //clean up function
    return ()=>{
      realm.removeListener("change",realmListener)
    }
  },[])
  

  const [jobsExist, setJobsExist] = useState (realm.objects('Job').length>0)
  const [jobsFromDB, setJobsFromDB] = useState([]);

  //debug check:
  //edit* actually no, an important function needed to circumvent redux's weird dispatch rules 
  const [localJobId, setLocalJobId] = useState(jobId)

  //used to populate the item array for the dropdown picker
  useEffect(()=>{
    //set it to run only if the jobs collection from mongodb is not empty
    if(jobsExist){
      setJobsFromDB(realm.objects('Job'));
      //somehow jobsFromDB after this line has not data
      /*setItems(jobsFromDB.map((e)=>{
        return {label:e.employer,value:e.id}
      }))
      */
    }
  },[jobsExist])

  //second function to update items in picker if jobsFromDB gets updated
  useEffect(()=>{
    if(jobsFromDB.length!==0){
      setItems(jobsFromDB.map((e)=>{
        return {label:e.employer,value:e.id}
      }))
    }else{
      //empty the items
      setItems([])
    }
  },[jobsFromDB])

  //debug function to compare the current selected job id with the job id at the global state
  //edit* not acutally a debug functiion, necessary to call setJobId indirectly outside the picker
  useEffect(()=>{
    setJobId(localJobId)
  },[localJobId])



  //sample jobs for testing purposes, will be discarded
  const generateIDInt = ()=>{
    return Math.floor(Math.random()*100000);
  }

  const addJobs = async () =>{
    try{
      let object = {
        id: generateIDInt(),
        employer: 'Kyle',
        client: 'elyk',
        color: 'rgba(245, 40, 145, 0.35)'
      }
      realm.write(()=>{
        realm.create('Job',object)
      })

    }catch(error){
      if(error){
        console.log(error)
      }
    }
  }
  const clearJobs = async ()=>{
    try{
      realm.write(()=>{
        let allJobs = realm.objects('Job');
        realm.delete(allJobs);
        console.log('all jobs deleted')
      })
    }catch(error){
      if(error){
        console.log(error)
      }
    }
  }

  const handleAddJobButton = async () =>{
    try{
  
      addJobs()
  
    }catch(error){
      console.log(error)
    }
 
  }
 

 


  return (

    <View style={styles.container}>
      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}
     
     {showTimer
      ?<Timer /> 
      :<View></View>
     }
  
      {
        debugInfo
        ?
          <View>
            <Text>localJobId: {JSON.stringify(localJobId)}</Text>
            <Text>jobId (redux global state): {JSON.stringify(jobId)}</Text>
            <Text>jobs stored in the picker: {JSON.stringify(items)}</Text>
            <Text>jobs from realm: {JSON.stringify(jobsFromDB)}</Text>
            <TouchableOpacity onPress={handleAddJobButton}>
              <Text>Add Jerbs</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{clearJobs()}}>
            <Text>clear Jerbs</Text>
          </TouchableOpacity>
          </View>
        : <View></View>
      }

      {
        jobsExist
        ?<View>
          <DropDownPicker
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

          <LocationMap/>
        </View>
        :<View>
          <Text>No jobs to track, add jobs from the setup screen to begin tracking</Text>
          <TouchableOpacity onPress={handleAddJobButton}>
            <Text>Or click me to add some jobs</Text>
          </TouchableOpacity>
        </View>
      }

    </View>
  );
}

const Tracking= connect(mapStateToProps,mapDispatchToProps)(_Tracking);
export default Tracking;