import { Marker, Popup } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCurrentLocation } from '../reducers/currentLocationReducer'

const StationLocationMarker = ({ location, setStationData2 }) => {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        trafficServices.getTrafficCamera(location.id).then(station =>
            dispatch(setCurrentLocation(station))
        )
    }

    return (
        <Marker 
          position={[location.geometry.coordinates[1], location.geometry.coordinates[0]]}
          eventHandlers={{ click: handleClick}}
        >
            <Popup>
                <h4>Station name: {location.properties.name}</h4>
                <LocationPictures location={location} setStationData2={setStationData2} />
            </Popup>
        </Marker>
    )
}

const LocationPictures = ( { location, setStationData2 }) => {
    const [stationData, setStationData] = useState([])

    useEffect(() => {
        trafficServices.getTrafficCamera(location.id).then(station =>
            setStationData(station)
        )
        trafficServices.getTrafficCamera(location.id).then(station =>
            setStationData2(station)
        )
    }, [])

    /*if (stationData) {
        return (
            <div>
               <h4>Station name: {location.properties.name}</h4>
            </div>
        )
    }*/
}

export default StationLocationMarker