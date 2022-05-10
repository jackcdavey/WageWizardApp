//For cleaning up the appearance of the worklog list
//https://www.npmjs.com/package/react-native-timeline-flatlist

import React from 'react';
import {
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  LogBox,
  Image
} from 'react-native';

import styles from '../../styles/stylesheet.js';

import { useState, useEffect } from 'react';
import realm from '../../userData/realm.js';


LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);


export default function WorkLogs(props) {

  const { navigation } = props

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

  const [items, setItems] = useState([])
  useEffect(() => {
    if (logsFromDB.length !== 0) {
      setItems(logsFromDB.map((e) => {
        return ({
          key: e.id,
          jobId: e.jobId,
          employer: realm.objects("Job").filtered("id = " + e.jobId)[0].employer,
          client: realm.objects("Job").filtered("id = " + e.jobId)[0].client,
          date: e.date,
          startTime: e.startTime,
          endTime: e.endTime,
          time: e.time,
          notes: e.notes
        })
      }))
    } else {
      //empty the items
      setItems([])
      //set the jobID back to default
    }
  }, [logsFromDB])
  let ampm = '';


  const getAMPM = (x) => {
    if (x >= 12)
      ampm = "PM";
    else
      ampm = "AM";
    return ampm;
  }


  return (
    <View style={styles.container}>
      {
        logsExist
          ? <View>
            <FlatList
              data={items}

              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => navigation.navigate('DetailedLog', {
                  logId: item.key,
                  employer: item.employer,
                  client: item.client,
                  date: item.date,
                  startTime: item.startTime,
                  endTime: item.endTime,
                  time: item.time,
                  notes: item.notes
                })}>
                  <View style={[styles.logItemButton, {
                    borderColor: realm.objectForPrimaryKey("WorkLog", item.key) ? realm.objectForPrimaryKey("Job", realm.objectForPrimaryKey("WorkLog", item.key).jobId).color : 'gray',
                    shadowColor: realm.objectForPrimaryKey("WorkLog", item.key) ? realm.objectForPrimaryKey("Job", realm.objectForPrimaryKey("WorkLog", item.key).jobId).color : 'gray'
                  }]}>
                    <Text style={styles.logItemLabel}>{item.date.getMonth() + "/" + item.date.getDate() + ',  ' + item.startTime.getHours() % 12 + ':' + item.startTime.getMinutes() + ' ' + getAMPM(item.startTime.getHours())} </Text><Text style={styles.logItemLabel}>{JSON.stringify(realm.objects("Job").filtered("id = " + item.jobId)[0].employer)}</Text>
                    <Image source={require('../../assets/images/icons/Expand.png')} style={{ width: Dimensions.get('window').width * 0.06, height: Dimensions.get('window').width * 0.06 }}></Image>
                  </View>
                </TouchableOpacity>}
            />
          </View>
          : <Text style={styles.subtitle}>No Logs To Show</Text>
      }
    </View>

  );


}
