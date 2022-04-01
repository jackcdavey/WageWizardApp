
export function startTimer(){
    return {type: "START_TIMER", isIdle: false, isRunning: true, isPaused: false}
}

export function pauseTimer(){
    return {type: "PAUSE_TIMER", isIdle: false, isRunning: false, isPaused: true}
}

export function resumeTimer(){
    return {type: "RESUME_TIMER", isIdle: false, isRunning: true, isPaused: false}
}

export function endTimer(){
    return {type: "END_TIMER", isIdle: true, isRunning: false, isPaused: false}
}

export function locationUpdate(latitude, longitude){
    return {type: "LOCATION_UPDATE", latitude:latitude, longitude:longitude}
}