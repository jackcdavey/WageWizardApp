import COLORS from '../../styles/colors.js';
import React from 'react';
import realm from '../../userData/realm.js';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  TextInput,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';

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
    //borderColor: COLORS.primary,
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
    width: Dimensions.get('window').width * 0.5,
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
  },
});

import Header from '../elements/Header.js';

const Tab = createBottomTabNavigator();




//Account Page Content
const AcccountView = ({ navigation }: { navigation: any }) => {
  return (
    <View>

      <View style={{
        flexDirection: 'row',
        paddingTop: 25,
      }}>
        <TouchableOpacity onPress={() => navigation.navigate('Account')}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingLeft: 20, paddingTop: 20 }}>
            <Image source={require('../../assets/images/icons/ProfileDefault.png')} style={{ width: 145, maxHeight: 145 }} resizeMode="contain" />
          </View>
        </TouchableOpacity>
        <View>
          <View style={styles.field}>
            <TextInput style={styles.input} placeholder="Full Name" />
          </View>
          <View style={styles.field}>
            <TextInput style={styles.input} placeholder="Email Address" />
          </View>

          <View style={styles.field}>
            <TextInput style={styles.input} placeholder="Birthday" />
          </View>
        </View>
      </View>
      <View style={{
        justifyContent: 'center',
      }}>
        <View style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}>
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
              [TEST - Trigger Setup]
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}




//Handles stack navigation settings for account//
export default function Account({ navigation }: { navigation: any }) {
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
          <Header title="Account Info" />
        ),
        headerLeft: () => (
          <TouchableOpacity style={{ backgroundColor: COLORS.secondary, marginLeft: 10, padding: 2 }} onPress={() => navigation.goBack()}>
            <Text style={{ fontSize: 20, fontWeight: "800" }}>[BACK BTN HERE]</Text>
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
