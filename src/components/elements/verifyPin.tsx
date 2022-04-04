import * as LocalAuthentication from 'expo-local-authentication';
import react from 'react';
import {
    hasHardwareAsync,
    isEnrolledAsync,
    authenticateAsync,
} from 'expo-local-authentication';
import { View, Text } from 'react-native';


export default async function VerifyPin({ navigation }: { navigation: any }) {
    const biometricsAvailable = await isEnrolledAsync() && await hasHardwareAsync();

    if (biometricsAvailable) {
        //display biometric prompt with pin behind it
        return (
            <>

            </>
        );
    }
    else
    //enter pin manually, no biometric prompt
    {
        return (
            <>

            </>
        );
    }
}