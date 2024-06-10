import { Marker, Popup } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useEffect, useState } from 'react'

const StationLocationMarker = ({ location }) => {
    return (
        <Marker position={[location.geometry.coordinates[1], location.geometry.coordinates[0] ]}>
            <Popup>
                <LocationPictures location={location}/>
            </Popup>
        </Marker>
    )
}

const LocationPictures = ( { location }) => {
    const [stationData, setStationData] = useState([])
    console.log(location.id)
    useEffect(() => {
        trafficServices.getTrafficCamera(location.id).then(station =>
            setStationData(station.properties.presets)
        )
    }, [])

    useEffect(() => {
        console.log(stationData)
    }, [stationData])

    return (
        <div style={{width: "400px", height: "300px"}}>
           <h4>Station name: {location.properties.name}</h4>
           {stationData.length > 0 && (
             <div>
                <p>{stationData[0].presentationName}</p>
                <div style={{ display: "flex", alignItems: "center"}}>
                  <img style={{ width: "200px", height: "200px"}} src={stationData[0].imageUrl} alt="Image"/>
                  <button className="nextButton">next</button>
                </div>
             </div>
           )}
           {/*<a href={stationData[0].imageUrl}>{stationData[0].imageUrl}</a>*/}
        </div>
    )
}

export default StationLocationMarker