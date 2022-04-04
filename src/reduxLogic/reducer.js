

const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;

const initialState = {
    distance: 0,
    radius: 0,
    isInsideGeofence: false,
    time:0,
    isIdle: true,
    isRunning: false,
    isPaused: false,
    region: {
        latitude: 37.347934,
        longitude: -121.940310,
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
                time:0
            }
        }
        case 'INCREMENT_TIME':{
            return {
                ...state,
                time:state.time+=1
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

        case 'SET_IS_INSIDE_GEOFENCE': {
            return {
                ...state,
                isInsideGeofence: action.isInsideGeofence
            }
        }
        
        case 'CHECK_DISTANCE': {
            return {
                ...state,
                distance: action.distance
            }
        }

        case 'CHECK_RADIUS': {
            return {
                ...state,
                radius: action.radius
            }
        }
        default:
            return state
    }
}