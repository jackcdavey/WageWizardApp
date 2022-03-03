import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Alert, Button, Image, Text} from 'react-native';


import COLORS from '../styles/colors.js';

import React from 'react';
import Tracking from './Track';
import Resources from './Resources';
import WorkLogs from './WorkLogs';
import MyWage from './MyWage';
import CustomIcon from './CustomIcon.js';
import Header from './Header.js';
import { color } from 'react-native-reanimated';


import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

const Tab = createBottomTabNavigator();


export default function NavBar() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Resources') {
            iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
          } 
          else if (route.name === 'Track') {
              iconName = focused ? 'stopwatch' : 'stopwatch';
          }
          else if (route.name === 'My Wage') {
              iconName = focused ? 'cash' : 'cash';
          }
          else if (route.name === 'Work Log') {
              iconName = focused ? 'book' : 'book';
          }
          else if (route.name === 'Account') {
            iconName = focused ? 'person' : 'person';
        }

          // You can return any component that you like here! -->>> SHOULD BE ICON THO
          //Currently, I'm just displaying each icon as a png as a workaround,
          // eventually they will be accessed from /assets/fonts/CustomIcons.ttf
          return <Resources/>; //Temp placeholder

        },
       
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle:{
          display: 'none',
        },

        //For some reason touch target for account icon is too tall, abt double height
        headerRight: () => (
          <TouchableOpacity onPress={() => Alert.alert('This will navigate to account page')}>
            <View >
              <Image source={require('../assets/images/icons/ProfileDefault.png')} style={{width:30, marginTop:10, marginRight:10}}  resizeMode="contain"/>
            </View>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Header title={route.name} />
        ),

      tabBarInactiveBackgroundColor:COLORS.primary,
      tabBarActiveBackgroundColor:COLORS.active,
      tabBarInactiveTintColor:COLORS.icon,
      tabBarActiveTintColor:"black",
      })}
      tabBar={props => <BottomTabBar {...props} state={{...props.state, routes: props.state.routes.slice(0,5)}}></BottomTabBar>}

      >

      <Tab.Screen
          name="Tracking" 
          component={Tracking}
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                resizeMode="contain"
                  style={{ width: size, height: size }}
                  source={require('../assets/images/icons/Stopwatch.png')}
                />
              );
            }}
        } />
        
        <Tab.Screen 
          name="My Wage" 
          component={MyWage}
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                resizeMode="contain"
                  style={{ width: size, height: size }}
                  source={require('../assets/images/icons/Money.png')}
                />
              );
            }}
    } />
    <Tab.Screen 
          name="Work Logs" 
          component={WorkLogs}
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                  resizeMode="contain"
                  style={{ width: size, height: size }}
                  source={require('../assets/images/icons/Notebook.png')}
                />
              );
            }}
      } />
        <Tab.Screen 
          name="Resources" 
          component={Resources}
          options={{
            tabBarIcon: ({size,focused,color}) => {
              return (
                <Image
                resizeMode="contain"
                  style={{ width: size, height: size }}
                  source={require('../assets/images/icons/Info.png')}
                />
              );
            }}
    } />

      {/* <View style={{ flexDirection: 'row', flex: 0 }}> 
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.active }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />
          <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.primary }} />

      </View> */}

      </Tab.Navigator>
    );
  }