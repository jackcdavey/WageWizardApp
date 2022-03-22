import { NavigationContainer } from '@react-navigation/native';
import { getHeaderTitle } from '@react-navigation/elements';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabBar } from '@react-navigation/bottom-tabs';
import { TouchableOpacity, Alert, Button, Image, Text } from 'react-native';


import COLORS from '../styles/colors.js';

import React from 'react';
import Tracking from './Track';
import Resources from './Resources';
import WorkLogs from './WorkLogs';
import Account from './Account';
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

        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTitleStyle: {
          display: 'none',
        },
        //For some reason touch target for account icon is too tall, abt double height
        headerRight: () => (
          <TouchableOpacity onPress={() => Alert.alert('This will navigate to account page')}>
            <View >
              <Image source={require('../assets/images/icons/ProfileDefault.png')} style={{ width: 30, marginRight: 10 }} resizeMode="contain" />
            </View>
          </TouchableOpacity>
        ),
        headerLeft: () => (
          <Header title={route.name} />
        ),

        tabBarInactiveBackgroundColor: COLORS.primary,
        tabBarActiveBackgroundColor: COLORS.active,
        tabBarInactiveTintColor: COLORS.icon,
        tabBarActiveTintColor: "black",
      })}

      tabBar={props => <BottomTabBar {...props} state={{ ...props.state, routes: props.state.routes.slice(0, 5) }}></BottomTabBar>}
    >
      
      <Tab.Screen
        name="Tracking"
        component={Tracking}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                resizeMode="contain"
                style={{ width: size, height: size }}
                source={require('../assets/images/icons/Stopwatch.png')}
              />
            );
          }
        }
        } />

      <Tab.Screen
        name="My Wage"
        component={MyWage}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                resizeMode="contain"
                style={{ width: size, height: size }}
                source={require('../assets/images/icons/Money.png')}
              />
            );
          }
        }
        } />
      <Tab.Screen
        name="Work Logs"
        component={WorkLogs}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                resizeMode="contain"
                style={{ width: size, height: size }}
                source={require('../assets/images/icons/Notebook.png')}
              />
            );
          }
        }
        } />
      <Tab.Screen
        name="Resources"
        component={Resources}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                resizeMode="contain"
                style={{ width: size, height: size }}
                source={require('../assets/images/icons/Info.png')}
              />
            );
          }
        }
        } />
        <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarIcon: ({ size, focused, color }) => {
            return (
              <Image
                resizeMode="contain"
                style={{ width: size, height: size }}
                source={require('../assets/images/icons/ProfileDefault.png')}
              />
            );
          }
        }
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