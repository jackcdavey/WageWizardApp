// gonna be useful: https://reactnavigation.org/docs/hiding-tabbar-in-screens
// as will this https://reactnavigation.org/docs/stack-navigator/
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import COLORS from '../styles/colors.js';
import 'react-native-gesture-handler';
import { View, TouchableOpacity, Text } from "react-native";
import Header from './Header';

const JobSetup = () => {
    return (
        <View>
            <Header title="Job Setup" />
        </View>
    )
}

const Tab = createBottomTabNavigator();

export default function JobSetupView({ navigation }: { navigation: any }) {
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

                    <Header title="Job" />

                ),
                headerLeft: () => (
                    <TouchableOpacity style={{ backgroundColor: COLORS.secondary, marginLeft: 10, padding: 2 }} onPress={() => navigation.goBack()}>
                        <Text style={{ fontSize: 20, fontWeight: "800" }}>[BACK BTN HERE]</Text>
                    </TouchableOpacity>
                ),


            })}
        >
            <Tab.Screen
                name="jobSetup"
                component={JobSetup}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}
