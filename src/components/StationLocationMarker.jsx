import { Marker, Popup } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { saveLocation, deleteLocation } from '../reducers/savedLocationReducer'

const StationLocationMarker = ({ location, setStationData2, saved }) => {
    return (
        <Marker position={[location.geometry.coordinates[1], location.geometry.coordinates[0] ]}>
            <Popup>
                <LocationPictures location={location} setStationData2={setStationData2} saved={saved}/>
            </Popup>
        </Marker>
    )
}

const LocationPictures = ( { location, setStationData2, saved }) => {
    const [stationData, setStationData] = useState([])
    const [index, setIndex] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        trafficServices.getTrafficCamera(location.id).then(station =>
            setStationData(station)
            //console.log(station.properties)
        )
        trafficServices.getTrafficCamera(location.id).then(station =>
            //setStationData2(station.properties.presets)
            setStationData2(station.properties)
        )
    }, [])

    const handleSave = () => {
        //saveLocation(stationData)
        dispatch(saveLocation(stationData))
        //console.log(stationData)
    }
    const handleDelete = () => {
        dispatch(deleteLocation(stationData))
        console.log(stationData)
    }

    if (stationData) {
        return (
            <div>
               <h4>Station name: {location.properties.name}</h4>
                 <div>
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {saved === false ? (
                         <button onClick={handleSave} className="saveButton">Tallenna</button>
                      ) : (
                        <button onClick={handleDelete} className="saveButton">Poista</button>
                      )}
                    </div>
                 </div>  
            </div>
        )
    }

    /*return (
        <div>
           <h4>Station name: {location.properties.name}</h4>
           {stationData.length > 0 && (
             <div>
                {/*<p>{stationData[index].presentationName}</p>*/}
                {/*<div style={{ display: "flex", alignItems: "center" }}>
                  <button onClick={handleSave} className="saveButton">Tallenna</button>
                </div>
             </div>
           )}
        </div>
    )*/
}

export default StationLocationMarker