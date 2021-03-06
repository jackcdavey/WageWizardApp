
export function startTimer() {
    return { type: "START_TIMER", isIdle: false, isRunning: true, isPaused: false }
}

export function pauseTimer() {
    return { type: "PAUSE_TIMER", isIdle: false, isRunning: false, isPaused: true }
}

export function resumeTimer() {
    return { type: "RESUME_TIMER", isIdle: false, isRunning: true, isPaused: false }
}

export function endTimer() {
    return { type: "END_TIMER", isIdle: true, isRunning: false, isPaused: false }
}

export function incrementTime() {
    return { type: "INCREMENT_TIME" }
}

export function locationUpdate(latitude, longitude) {
    return { type: "LOCATION_UPDATE", latitude: latitude, longitude: longitude }
}

export function setIsInsideGeofence(isInsideGeofence) {
    return { type: "SET_IS_INSIDE_GEOFENCE", isInsideGeofence: isInsideGeofence }
}

export function setIsTracking(isTracking) {
    return { type: "SET_IS_TRACKING", isTracking: isTracking }
}

export function setJobId(jobId) {
    return { type: "SET_JOBID", jobId: jobId }
}

export function addNote(note) {
    return { type: "ADD_NOTE", note: note}
}

export function setNote(note){
    return {type: "SET_NOTE", note: note}
}

export function updateStartTime(startTime){
    return {type: "UPDATE_START_TIME", start_time: startTime}
}

export function updateEndTime(endTime){
    return {type: "UPDATE_END_TIME", end_time: endTime}
}






