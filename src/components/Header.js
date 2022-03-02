import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';

import COLORS from '../styles/colors'

//Set color of status bar globally here, eventualy set to 'auto'
export default function Header(props) {
  return (
    <TouchableHighlight onPress={()=>{props.navigation.navigate('camera')}}>
        <View style={styles.container}> 
        <StatusBar style="light" /> 
            <Text style={{
                fontWeight:'bold',
                fontSize:30,
                color:COLORS.secondary
            }}>{props.title}</Text>
        </View>
    </TouchableHighlight>
  );
} 

const styles = StyleSheet.create({
    container: {
        height: 40, // Specify the height of your custom header
        paddingLeft: 20,
        marginTop: 0,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',

    },
    text:{
        fontWeight:'bold',
        fontStyle:'italic'
    }
});



