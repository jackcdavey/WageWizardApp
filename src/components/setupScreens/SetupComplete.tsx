import React from 'react';
import COLORS from '../../styles/colors.js';
import { View, TouchableOpacity, StyleSheet, Dimensions, Text } from "react-native";

import RNRestart from 'react-native-restart';

//Eventually, the route will need to be checked to ensure this screen only appears 
//on first time setup. Currently, it is shown every time a job is added.

export default function SetupComplete({ navigation }: { navigation: any }) {
    return (
        <View style={{
            flexDirection: 'column',
            flex: 1,
            alignItems: 'center',
        }}>
            <View style={styles.container}>
                <Text style={[styles.title, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>Setup Complete!</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.directions}>
                    Congratulations! You're ready to start using Wage Wizard to
                    track your work, and defend against wage theft.
                </Text>


                <TouchableOpacity style={styles.button} onPress={() => RNRestart.Restart()}>
                    <Text style={{ color: COLORS.secondary }}>Finish</Text>
                </TouchableOpacity>
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    article: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.2,
        margin: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
    },
    item: {
        margin: 25,
        padding: 10,
        backgroundColor: COLORS.active,
        fontSize: 18,
        height: 44,
    },
    input: {
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 15,
        marginTop: 20,
        borderColor: COLORS.primary,
        borderWidth: 2,
        padding: 10,
    },
    title: {
        fontSize: 40,
        color: COLORS.dark,
        textAlign: 'center',

    },
    directions: {
        fontSize: 20,
        fontWeight: '300',
        textAlign: 'center',
        color: COLORS.dark,
    },
    container: {
        width: Dimensions.get('window').width * 0.8,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        //paddingTop: Dimensions.get('window').height * 0.3,
        //This is a temp fix to force the buttons to be on the bottom of the screen
        //Content is cut off at some screen sizes, but "flex-end" doesn't work
    },
    button: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.1,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 30,
    }
});
