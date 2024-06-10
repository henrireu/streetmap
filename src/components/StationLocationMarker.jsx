import { Marker, Popup } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useEffect, useState } from 'react'

const StationLocationMarker = ({ location, setStationData2 }) => {
    return (
        <Marker position={[location.geometry.coordinates[1], location.geometry.coordinates[0] ]}>
            <Popup>
                <LocationPictures location={location} setStationData2={setStationData2}/>
            </Popup>
        </Marker>
    )
}

const LocationPictures = ( { location, setStationData2 }) => {
    const [stationData, setStationData] = useState([])
    const [index, setIndex] = useState(0)
    useEffect(() => {
        trafficServices.getTrafficCamera(location.id).then(station =>
            setStationData(station.properties.presets)
        )
        trafficServices.getTrafficCamera(location.id).then(station =>
            //setStationData2(station.properties.presets)
            setStationData2(station.properties)
        )
    }, [])

    const handleClick = () => {
        setStationData2(stationData)
        if (index === stationData.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    return (
        <div>
           <h4>Station name: {location.properties.name}</h4>
           {stationData.length > 0 && (
             <div>
                <p>{stationData[index].presentationName}</p>
                <div style={{ display: "flex", alignItems: "center"}}>
                  {/*<img style={{ width: "230px", height: "230px"}} src={stationData[index].imageUrl} alt="Image"/>*/}
                  {/*<button onClick={handleClick} className="nextButton">next</button>*/}
                </div>
             </div>
           )}
        </div>
    )
}

export default StationLocationMarker