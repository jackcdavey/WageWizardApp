import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
import COLORS from '../styles/colors'

//Set color of status bar globally here, eventualy set to 'auto'


export default function Header(props) {
    if(global.globalCustomFontUse){
    return (
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={{
                fontFamily: 'Comfortaa-Bold',
                fontSize: 30,
                color: COLORS.secondary
            }}>{props.title}</Text>
        </View>
    );
    }
    else{
        return (
            <View style={styles.container}>
                <StatusBar style="light" />
                <Text style={{
                    fontSize: 30,
                    color: COLORS.secondary
                }}>{props.title}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        height: 40, // Specify the height of your custom header
        paddingLeft: 20,
        marginTop: 0,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        
    },
    text: {
    }
});



