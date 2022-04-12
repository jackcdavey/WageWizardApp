import React from 'react';
import COLORS from '../../styles/colors.js';
import {
  StyleSheet,
  Text,
  FlatList,
  View,
  Dimensions,
  TouchableOpacity,
  LogBox,
} from 'react-native';

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

  return (
    <View style={styles.container}>
      {
        logsExist
          ? <View>
            <FlatList
              data={items}

              renderItem={({ item }) =>
                <TouchableOpacity onPress={() => navigation.navigate('DetailedLog', {
                  employer: item.employer,
                  client: item.client,
                  date: item.date,
                  time: item.time,
                  notes: item.notes
                })}>
                  {/* Alert.alert('This will navigate to the ' + item.key + ' detailed work log') */}
                  <View style={styles.item}>
                    <Text style={styles.info}>{JSON.stringify(realm.objects("Job").filtered("id = " + item.jobId)[0].employer)}</Text>
                  </View>
                </TouchableOpacity>}
            />
          </View>
          : <Text>No Logs To Show</Text>
      }
    </View>

  );


}



const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    padding: 10,
    backgroundColor: COLORS.active,
    height: Dimensions.get('window').height * 0.07,
    width: Dimensions.get('window').width * 0.9,
    borderRadius: 15,
    borderColor: COLORS.dark,
    borderWidth: 2,
  },
  info: {
    fontSize: 20,
  }
});
