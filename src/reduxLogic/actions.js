
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






