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

const debugInfo = true;

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
  const [jobsAdded,setJobsAdded] = useState(false);
  const [allJobs,getAllJobs] = useState([]);
  const [localJobId, setLocalJobId] = useState(jobId)


  useEffect(()=>{
    if (jobsAdded){
      setItems(allJobs.map((e)=>{
        return {label:e.employer,value:e.id}
      }
      ))
    }
  },[jobsAdded])

  useEffect(()=>{
    setJobId(localJobId.toString())
  },[localJobId])

  const job1 = {
    id: 1,
    employer: 'Kyle',
    client: 'elyk',
    color: 'rgba(245, 40, 145, 0.35)'
  }
  const job2 = {
    id: 2,
    employer: 'Jack',
    client: 'kcaj',
    color: 'rgba(245, 40, 145, 0.35)'
  }
  const job3 = {
    id: 3,
    employer: 'Brett',
    client: 'tterb',
    color: 'rgba(245, 40, 145, 0.35)'
  }
  const addJobs = async () =>{
    try{
      realm.write(()=>{
        realm.create('Job',job1)
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
      getAllJobs(realm.objects('Job'))
      setJobsAdded(true);
  
    }catch(error){
      console.log(error)
    }
 
  }
  const testing =()=>{
    setItems(allJobs.map((e)=>{
      return {label:e.employer,value:e.id}
    }
    ))
  }

  const updateJobId = (jobId) =>{
    setJobId(jobId);
  }


  return (

    <View style={styles.container}>
      {/* <Text style={[styles.elements, global.globalCustomFontUse ? { fontFamily: 'SFPro-Regular' } : {}]}>Job: Default Job</Text> */}
      <Timer />
      {
        debugInfo
        ?
          <View>
            <TouchableOpacity onPress={()=>{setJobId(3)}}>
              <Text>changeJobId</Text>
            </TouchableOpacity>
            <Text>localJobId: {JSON.stringify(localJobId)}</Text>
            <Text>jobId: {JSON.stringify(jobId)}</Text>
            <Text>JobsArray: {JSON.stringify(items)}</Text>
            <Text>Jobs: {JSON.stringify(allJobs)}</Text>

          </View>
        : <View></View>
      }


      {
        jobsAdded
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
        </View>
        :<View>
          <Text>No Jobs Added</Text>
          <TouchableOpacity onPress={handleAddJobButton}>
            <Text>Add The Jobs</Text>
          </TouchableOpacity>

        </View>
      }
      <TouchableOpacity onPress={testing}>
        <Text>test</Text>
      </TouchableOpacity>

      <LocationMap />
    </View>
  );
}

const Tracking= connect(mapStateToProps,mapDispatchToProps)(_Tracking);
export default Tracking;