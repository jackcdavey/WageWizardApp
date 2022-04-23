import { Appearance } from "react-native";
const darkMode = Appearance.getColorScheme() === "dark";

if (!darkMode) {
    COLORS = {
        primary: '#2374AB',
        secondary: '#F2FFFC',
        dark: '#28262C',
        light: '#FFFFFF',
        active: '#91BAD5',
        icon: "#F0F8FF",
        trackTimerStart: 'green',
        trackTimerStop: 'red',
        lightPlaceholder: 'grey',
    };
} else {
    COLORS = {
        primary: '#2374AB',
        secondary: '#1c1c45',
        dark: '#d9d9d9',
        light: '#28262C',
        active: '#91BAD5',
        icon: "#F0F8FF",
        trackTimerStart: 'green',
        trackTimerStop: 'red',
        lightPlaceholder: 'grey',
    };
}

export default COLORS;