import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({



    //Thisll get messy really fast, so we'll need a way to organize the styles
    //Maybe like this?


    //INTERACTIVE ELEMENTS
    //Buttons//

    //Buttons//


    //Switches//

    //Switches//


    //Pickers//

    //Pickers//


    //STATIC ELEMENTS
    //Text//

    //Text//


    //Labels//

    //Labels//


    //Images//

    //Images//


    //CONTAINERS
    //Views//

    //Views//

    /////////////OLD STYLES BELOW//////////////

    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    },
    elements: {
        paddingBottom: Dimensions.get('window').height * 0.02,
        paddingTop: Dimensions.get('window').height * 0.02,
        fontSize: 40,
    },

    ////////////////Track View Styles///////////////
    map: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.35,
    },
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


});

export default styles;