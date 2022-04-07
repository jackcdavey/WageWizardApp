import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight, Dimensions } from 'react-native';
import React from 'react';
import COLORS from '../../styles/colors'
import styles from '../../styles/stylesheet.js';

//Set color of status bar globally here, eventualy set to 'auto'
export default function Header(props) {


    return (
        //<TouchableHighlight onPress={()=>{props.navigation.navigate('Tracking')}}>
        <View style={styles.headerContainer}>
            <StatusBar style="light" />
            <Text style={[styles.headerTxt, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>{props.title}</Text>

        </View>
        //</TouchableHighlight>
    );
}



