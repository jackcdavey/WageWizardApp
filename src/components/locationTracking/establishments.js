


//Establishment object, each job a caregiver has should be defined as an establishment object which can have more than one location,
//for example, a caregiver might work for the establishment, "Sunny Oaks Carehomes" which can have multiple carehomes under it
const establishment = {
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
            radius: 10
        },
    ]
}

const generateGeofence = (establishment)=>{
    const geofences = establishment.locations.map((location)=>{
        return {
            latitude:location.latLng.latitude,
            longitude:location.latLng.longitude,
            radius:location.radius
        }
    })
    console.log(geofences)
    return geofences
}

export {establishment, generateGeofence}



  
