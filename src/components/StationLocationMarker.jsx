import { Marker, Popup } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useDispatch } from 'react-redux'
import { setCurrentLocation } from '../reducers/currentLocationReducer'
import { setIndex } from '../reducers/indexReducer'

const StationLocationMarker = ({ location }) => {
    const dispatch = useDispatch()
    const handleClick = (e) => {
        dispatch(setIndex(0))
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
            </Popup>
        </Marker>
    )
}

export default StationLocationMarker