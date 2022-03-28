import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import React from 'react';
import COLORS from '../../styles/colors'

//Set color of status bar globally here, eventualy set to 'auto'
export default function Header(props) {
    return (
        //<TouchableHighlight onPress={()=>{props.navigation.navigate('Tracking')}}>
        <View style={styles.container}>
            <StatusBar style="light" />
            <Text style={[styles.txt, global.globalCustomFontUse ? { fontFamily: 'Comfortaa-Bold' } : {}]}>{props.title}</Text>

        </View>
        //</TouchableHighlight>
    );
}

const styles = StyleSheet.create({
    container: {
        height: 40, // Specify the height of your custom header
        width: '100%', // Specify the width of your custom header
        paddingLeft: 20,
        marginTop: 0,
        alignItems: 'center',
        //justifyContent: 'left',
        flexDirection: 'row',

        backgroundColor: COLORS.primary,
    },
    txt: {
        fontSize: 30,
        color: COLORS.secondary,
    },
});



