import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';

import COLORS from '../styles/colors'

export default function Header(props) {
  return (

    <TouchableHighlight onPress={()=>{props.navigation.navigate('camera')}}>
        <View style={styles.container}> 
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
        height: 60, // Specify the height of your custom header
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



