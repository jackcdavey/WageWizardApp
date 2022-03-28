// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import COLORS from '../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Text } from "react-native";
import Header from './Header';
import JobSetup from './AddJob';
import JobLocationSetup from './AddJobLocation';
import InitialSetupView from './InitialSetupView';
import SetupComplete from './SetupComplete';

const Tab = createBottomTabNavigator();

export default function SetupNav({ navigation }: { navigation: any }) {
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

                headerLeft: () => (
                    <Header title="Setup" />

                ),


            })}
        >
            <Tab.Screen
                name="JobSetup"
                component={JobSetup}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="InitialSetup"
                component={InitialSetupView}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="JobLocationSetup"
                component={JobLocationSetup}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
            <Tab.Screen
                name="SetupComplete"
                component={SetupComplete}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}
