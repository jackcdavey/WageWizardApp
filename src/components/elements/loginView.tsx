import react from 'react';
import {
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync,
} from 'expo-local-authentication';
import { View, Text } from 'react-native';
import { TabActions } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();
var isAuthenticated = false;

async function VerifyPin() {
    const biometricsAvailable = await isEnrolledAsync() && await hasHardwareAsync();
    if (!biometricsAvailable) {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>No biometrics available</Text>
                {/* Pin code here */}
            </View>
        );
    }

    const result = await authenticateAsync({ promptMessage: 'Please authenticate' });
    if (result.success) {
        console.log('Authenticated successfully!');
        isAuthenticated = true;
    } else {
        console.log('Authentication failed: ', result.error);
    }
}

const pinView = () => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Pin code here</Text>
        </View>
    );
}

export default function loginView({ navigation }: { navigation: any }) {
    return (
        <Tab.Navigator>
            <Tab.Screen
                name="VerifyPin"
                component={pinView}
                options={{
                    tabBarStyle: { display: 'none' },
                }}
            />
        </Tab.Navigator>
    );
}