//Useful resources:
//https://medium.com/@shanerudolfworktive/7-tips-to-develop-react-native-uis-for-all-screen-sizes-7ec5271be25c

//TODO:
//1. Transfer all remaining styles from separate files
//2. Switch (almost) every px to %, rem, & Dimensions.get('window')
//3. Check content sizing on different screen sizes
//4. Check accessibility setting behavior

import EStyleSheet from "react-native-extended-stylesheet";
import { Dimensions } from "react-native";
//import COLORS from "../styles/colors.js";

const styles = EStyleSheet.create({



    //Thisll get messy really fast, so we'll need a way to organize the styles
    //Maybe like this?


    //INTERACTIVE ELEMENTS
    //Buttons//
    searchButton: {
        width: '15%',
        height: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: '5%',
    },

    testButton: {
        padding: '3%',
        margin: '2%',
        backgroundColor: 'red',
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',

    },
    //Buttons//


    //Switches//

    //Switches//


    //Pickers//

    //Pickers//

    //TextInputs//
    searchText: {
        width: '80%',
        borderRadius: 15,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
    },

    setupTextField: {
        width: Dimensions.get('window').width * 0.8,
        maxHeight: Dimensions.get('window').height * 0.1,
        borderRadius: 15,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: '2%',
        margin: '2%',
        alignItems: 'center',
    },

    //TextInputs//


    //STATIC ELEMENTS
    //Text//
    profileAccountInfoField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: '2%',
    },


    //Text//


    //Labels//

    //Labels//


    //Images//

    //Images//


    //CONTAINERS
    searchContainer: {
        width: '90%',
        height: '5%',
        display: 'flex',
        flexDirection: 'row',
        margin: '5%',
        alignItems: 'center',
    },

    userSetupFieldsContainer: {
        width: '100%',
        alignItems: 'center',
    },

    profileInformationContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: '15%',
        paddingBottom: '5%',

    },

    /////////////OLD STYLES BELOW//////////////

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
        paddingTop: Dimensions.get('window').height * 0.05,
    },
    elements: {
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
        fontSize: 40,
    },
    map: {
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        margin: '2%',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.35,
    },

    ////////////////Track View Styles///////////////
    start: {
        width: Dimensions.get('window').height * 0.2,
        height: Dimensions.get('window').height * 0.2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Dimensions.get('window').height * 0.2 / 2,
        borderColor: COLORS.dark,
        borderWidth: 2,
        backgroundColor: "green",
    },
    picker: {
        margin: 15, padding: 10,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    pickerContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.07,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        zIndex: 1,
    },
    pickerLabel: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.primary,
    },
    ////////////////Track View Styles///////////////

    ////////////////Initial Setup View Styles///////////////

    field: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        //maxHeight: '10%',
        //margin: '2%',
    },
    input: {
        width: '80%',
        borderRadius: 15,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: 10,
        alignItems: 'center',
    },
    title: {
        fontSize: '35rem',
        fontFamily: 'Comfortaa-Bold',
        color: COLORS.dark,
        textAlign: 'center',
    },
    directions: {
        fontSize: '15rem',
        fontWeight: '300',
        textAlign: 'center',
        color: COLORS.dark,
    },
    directionsWrap: {
        width: Dimensions.get('window').width * 0.8,
        marginBottom: '5%',
        alignItems: 'center',
    },
    buttonWrap: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        minWidth: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').height * 0.05,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '2%',
        padding: '2%',
    },

    ////////////////Initial Setup View Styles///////////////


    ////////////////Header Styles///////////////
    headerContainer: {
        height: Dimensions.get('window').height * 0.06,
        width: Dimensions.get('window').width * 0.5,
        paddingLeft: '10%',
        alignItems: 'center',
        flexDirection: 'row',


    },
    headerTxt: {
        fontSize: '30rem',
        color: COLORS.secondary,
        fontFamily: 'Comfortaa-Bold',

        alignContent: 'flex-start',
        //marginBottom: 5,
    },


    ////////////////Header Styles///////////////


});

export default styles;