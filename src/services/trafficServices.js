import axios from "axios"

const getTrafficMessages = () => {
    const response = axios.get('https://tie.digitraffic.fi/api/traffic-message/v1/messages?inactiveHours=0&includeAreaGeometry=false&situationType=TRAFFIC_ANNOUNCEMENT')
    return response.then(response => {
        return response.data.features
    })
}

const getTrafficStationCoordinates = () => {
    const response = axios.get('https://tie.digitraffic.fi/api/weathercam/v1/stations')
    return response.then(response => {
        return response.data.features
    })
}

const getTrafficCamera = (id) => {
    const url = `https://tie.digitraffic.fi/api/weathercam/v1/stations/${id}`
    const response = axios.get(url)
    return response.then(response => response.data)
}

export default { getTrafficMessages, getTrafficStationCoordinates, getTrafficCamera}