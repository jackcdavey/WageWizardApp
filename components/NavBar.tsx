
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
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
      <Tab.Navigator>
        <Tab.Screen name="Tracking" component={Tracking} />
        <Tab.Screen name="WorkLogs" component={WorkLogs} />
        <Tab.Screen name="Resources" component={Resources} />
        <Tab.Screen name="My Wage" component={MyWage} />
      </Tab.Navigator>
    );
  }