

const LATITUDE_DELTA = 0.000922;
const LONGITUDE_DELTA = 0.000421;




const sampleJob = {
    name: "Santa Clara University",
    //for drawing in the map
    color: 'rgba(245, 40, 145, 0.35)',
    locations: [
        {
            name: "nobili",
            latLng: {latitude: 37.348899, longitude: -121.942312},
            radius: 30
        },
        {
            name: "scdi",
            latLng: {latitude: 37.349036, longitude: -121.938545},
            radius: 30
        },
        {
            name: "heafey",
            latLng: {latitude: 37.349090, longitude: -121.939589},
            radius: 30
        },
        {
            name: "benson",
            latLng: {latitude: 37.347578,longitude: -121.939423},
            radius: 40
        },
        {
            name: "my_house",
            latLng: {latitude: 37.379903,longitude: -121.851886},
            radius: 30
        },
        {
            name: "cassa",
            latLng: {latitude: 37.347120,longitude: -121.935115},
            radius: 30
        },

    ]
}

const initialState = {
    isTracking: false,
    isInsideGeofence: false,
    time:0,
    isIdle: true,
    isRunning: false,
    isPaused: false,
    jobId: -5,
    selectedJob: sampleJob,
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

        case 'SET_IS_TRACKING': {
            return{
                ...state,
                isTracking: action.isTracking
            }
        }

        case 'SET_SELECTED_JOB': {
            return{
                ...state,
                selectedJob: action.selectedJob
            }
        }
        
        case 'SET_JOBID': {
            return{
                ...state,
                jobId: action.jobId
            }
        }

        
        default:
            return state
    }
}