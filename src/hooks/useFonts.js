import * as Font from 'expo-font';

export default useFonts = async () => 
    await Font.loadAsync({
        'Comfortaa-Regular': require('../assets/fonts/Comfortaa-Regular.ttf'),
        'Comfortaa-Bold': require('../assets/fonts/Comfortaa-Bold.ttf'),
    });