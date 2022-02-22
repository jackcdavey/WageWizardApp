
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import COLORS from '../styles/colors.js';

import React from 'react';
import Tracking from './Track';
import Resources from './Resources';
import WorkLogs from './WorkLogs';
import MyWage from './MyWage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


const Tab = createBottomTabNavigator();

export default function NavBar() {
    return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Resources') {
            iconName = focused
              ? 'ios-information-circle'
              : 'ios-information-circle-outline';
          } else if (route.name === 'Tracking') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }

          // You can return any component that you like here!
          return <Tracking />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      >
        <Tab.Screen name="Tracking" component={Tracking} />
        <Tab.Screen name="WorkLogs" component={WorkLogs} />
        <Tab.Screen name="Resources" component={Resources} />
        <Tab.Screen name="My Wage" component={MyWage} />
      </Tab.Navigator>
    );
  }