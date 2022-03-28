import COLORS from '../../styles/colors.js';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';

const styles = StyleSheet.create({
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
    borderColor: COLORS.dark,
    borderWidth: 2,
    alignItems: 'center',
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
      <View>
        <View style={styles.info}>
          <Text style={styles.item}>
            Account items will be shown here.
          </Text>
        </View>


        <TouchableOpacity onPress={() => navigation.navigate("Setup")}>
          <View style={styles.btn}>
            <Text style={styles.item}>
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
