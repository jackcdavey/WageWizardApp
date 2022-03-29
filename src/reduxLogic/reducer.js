
const initialState = {
    isIdle: true,
    isRunning: false,
    isPaused: false,
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
        default:
            return state
    }
}