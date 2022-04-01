
//const LATITUDE = 37.78825;
//const LONGITUDE = -122.4324;
const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;


const initialState = {
    isIdle: true,
    isRunning: false,
    isPaused: false,
    region: {
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
    }
}

export default function Reducer(state = initialState, action){
    switch(action.type){
        case 'START_TIMER': {
            return {
                ...state,
                isIdle: action.isIdle,
                isRunning: action.isRunning,
                isPaused: action.isPaused
            }
        }
        case 'PAUSE_TIMER': {
            return {
                ...state,
                isIdle: action.isIdle,
                isRunning: action.isRunning,
                isPaused: action.isPaused
            }
        }
        case 'RESUME_TIMER': {
            return {
                ...state,
                isIdle: action.isIdle,
                isRunning: action.isRunning,
                isPaused: action.isPaused
            }
        }
        case 'END_TIMER': {
            return {
                ...state,
                isIdle: action.isIdle,
                isRunning: action.isRunning,
                isPaused: action.isPaused,
            }
        }

        case 'LOCATION_UPDATE': {
            return {
                ...state,
                region: {
                    latitude: action.latitude,
                    longitude: action.longitude,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA
                }
            }
        }
        default:
            return state
    }
}