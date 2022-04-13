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
        width: Dimensions.get('window').width * 0.2,
        maxHeight: '100%',
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        padding: '2%',
        margin: '2%',
    },

    testButton: {
        margin: '1%',
        backgroundColor: 'red',
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        height: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').width * 0.4,
    },


    startButton: {
        width: Dimensions.get('window').height * 0.15,
        height: Dimensions.get('window').height * 0.15,
        borderRadius: Dimensions.get('window').height * 0.15 / 1.5,
        backgroundColor: 'green',
        borderColor: COLORS.primary,
        borderWidth: 2,
        margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',

    },
    stopButton: {
        width: Dimensions.get('window').height * 0.15,
        height: Dimensions.get('window').height * 0.15,
        borderRadius: Dimensions.get('window').height * 0.15 / 1.5,
        backgroundColor: 'red',
        borderColor: COLORS.primary,
        borderWidth: 2,
        //margin: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteButton: {
        width: Dimensions.get('window').height * 0.07,
        height: Dimensions.get('window').height * 0.07,
        borderRadius: Dimensions.get('window').height * 0.07 / 0.7,
        backgroundColor: COLORS.active,
        borderColor: COLORS.primary,
        borderWidth: 2,
        margin: '5%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    closeButton: {
        width: Dimensions.get('window').height * 0.05,
        height: Dimensions.get('window').height * 0.05,
        borderRadius: Dimensions.get('window').height * 0.05 / 0.5,
        backgroundColor: 'red',
        borderColor: COLORS.primary,
        borderWidth: 2,
        margin: '2%',
        justifyContent: 'flex-start',
    },
    logItemButton: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        margin: '3%',
        backgroundColor: COLORS.active,
        height: Dimensions.get('window').height * 0.07,
        width: Dimensions.get('window').width * 0.9,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
    },
    //Buttons//


    //Switches//

    //Switches//


    //Pickers//

    //Pickers//

    //TextInputs//
    searchText: {
        width: Dimensions.get('window').width * 0.6,
        maxHeight: '75%',
        borderRadius: 15,
        borderColor: COLORS.primary,
        backgroundColor: COLORS.secondary,
        borderWidth: 2,
        padding: '2%',
        margin: '2%',
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
    noteTextField: {
        width: Dimensions.get('window').width * 0.8,
        minHeight: Dimensions.get('window').height * 0.1,
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
    title: {
        fontSize: '35rem',
        fontFamily: 'Comfortaa-Bold',
        color: COLORS.dark,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: '25rem',
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
    prompt: {
        fontSize: '20rem',
        fontWeight: '500',
        paddingTop: '10%',
        textAlign: 'center',
        color: COLORS.dark,
    },
    profileAccountInfoField: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        marginTop: '2%',
    },
    headerTxt: {
        fontSize: '30rem',
        color: COLORS.secondary,
        fontFamily: 'Comfortaa-Bold',
        alignContent: 'flex-start',
    },
    timerText: {

        fontSize: '35rem',
        fontWeight: '700',
        fontFamily: 'SFPro-Regular',
        color: COLORS.dark,
        textAlign: 'center',
    },
    currentJobText: {
        fontSize: '15rem',
        fontWeight: '700',
        textAlign: 'center',
        color: COLORS.dark,
    },

    logTitle: {
        fontSize: 42,
        fontWeight: 'bold',
        color: COLORS.dark,
        textAlign: 'center',
    },
    logText: {
        fontSize: 18,
        color: COLORS.dark,
    },




    //Text//


    //Labels//
    buttonText: {
        margin: 5,
        padding: 10,
        color: COLORS.light,
        fontSize: '20rem',
        height: 44,
        fontWeight: 'bold',
        justifyContent: 'center',
        alignItems: 'center',
    },
    smallButtonText: {
        margin: 5,
        color: COLORS.light,
        fontSize: '10rem',
        fontWeight: 'bold',
        justifyContent: 'center',
    },
    closeButtonText: {
        margin: 5,
        padding: 10,
        color: COLORS.light,
        fontSize: '15rem',
        fontWeight: 'bold',
    },
    timerLabel: {

        fontSize: '35rem',
        fontWeight: '500',
        fontFamily: 'SFPro-Regular',
        color: 'gray',
        textAlign: 'center',
    },
    pickerListItemLabel: {
        fontSize: '15rem',
        color: COLORS.dark,
        fontFamily: 'SFPro-Regular',
        fontWeight: '600',
        textAlign: 'center',
        padding: '2%',
    },
    currentJobLabel: {
        fontSize: '15rem',
        fontWeight: '500',
        textAlign: 'center',
        color: 'gray',
    },
    logItemLabel: {
        fontSize: '20rem',
        fontFamily: 'SFPro-Regular',
        color: COLORS.dark,
        textAlign: 'center',
    },
    logLabel: {
        fontSize: 18,
        color: COLORS.dark,
        fontWeight: 'bold',
        textAlign: 'left',
        padding: 10,
    },
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
        paddingLeft: '15%',
        marginTop: '5%',
        marginBottom: '5%',

    },
    buttonContainer: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-evenly',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noteModal: {
        margin: '5%',
        width: Dimensions.get('window').width * 0.8,
        minHeight: Dimensions.get('window').height * 0.2,
        backgroundColor: 'white',
        borderRadius: 15,
        borderColor: COLORS.dark,
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
    },
    arrowContainer: {
        width: Dimensions.get('window').height * 0.023,
        height: Dimensions.get('window').height * 0.04,
        justifyContent: 'flex-start',
    },

    logContainer: {
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.7,
        margin: 20,
        padding: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    logSectionContainer: {
        width: Dimensions.get('window').width * 0.8,
        minHeight: Dimensions.get('window').height * 0.05,
        display: 'flex',
        flexDirection: 'row',
        marginTop: 20,
        alignItems: 'center',
        borderColor: COLORS.dark,
        backgroundColor: 'white',
        borderWidth: 2,
        borderRadius: 15,
    },
    pickerContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.07,
        margin: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: COLORS.primary,
        zIndex: 2,
    },
    pickerDropDownContainer: {
        backgroundColor: COLORS.secondary,
        width: Dimensions.get('window').width * 0.9,
        borderWidth: 2,
        borderRadius: 15,
        borderColor: COLORS.primary,
        padding: '5%',
        zIndex: 1,
    },

    //CONTAINERS//


    /////////////OLD STYLES BELOW//////////////

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    article: {
        width: Dimensions.get('window').width * 0.3,
        height: Dimensions.get('window').width * 0.2,
        margin: 25,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
    },
    elements: {
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
        fontSize: 40,
    },
    map: {
        width: '100%',
        height: '100%',
    },
    mapContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.35,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        overflow: 'hidden',
    },
    infoBox: {
        display: 'flex',
        minWidth: Dimensions.get('window').width * 0.9,
        minHeight: Dimensions.get('window').height * 0.07,
        margin: 15,
        padding: 10,
        backgroundColor: COLORS.secondary,
        borderRadius: 15,
        borderColor: COLORS.dark,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item: {
        margin: 25,
        padding: 10,
        backgroundColor: COLORS.active,
        fontSize: 18,
        height: 44,
    },
    label: {
        fontSize: 23,
    },
    infoTxt: {
        fontSize: 50,
    },
    btn: {
        width: Dimensions.get('window').width * 0.6,
        height: Dimensions.get('window').width * 0.2,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTxt: {
        fontSize: 20,
        fontWeight: 'bold',
        color: COLORS.secondary,
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
        height: Dimensions.get('window').height * 0.05,
        width: Dimensions.get('window').width * 0.4,
        backgroundColor: COLORS.primary,
        borderRadius: 15,
        borderColor: COLORS.primary,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        margin: '1%',
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



    ////////////////Header Styles///////////////


});

export default styles;