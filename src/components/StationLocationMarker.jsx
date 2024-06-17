import { Marker, Popup, Tooltip } from 'react-leaflet'
import trafficServices from '../services/trafficServices'
import { useDispatch, useSelector } from 'react-redux'
import { setCurrentLocation } from '../reducers/currentLocationReducer'
import { setIndex } from '../reducers/indexReducer'
import { saveLocation, deleteLocation } from '../reducers/savedLocationReducer'
import { setMessage } from '../reducers/messageReducer'

const StationLocationMarker = ({ location, currentState }) => {
    const version = useSelector((state) => state.version)

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
          <Tooltip>{location.properties.name}</Tooltip>
          <Popup>
            <h4>Station name: {location.properties.name}</h4>
            {version === 'mobile' && (
              <MobilePictureDiv currentState={currentState}/>
            )}
          </Popup>
        </Marker>
    )
}

const MobilePictureDiv = ({ currentState }) => {
  const currentLocation = useSelector((state) => state.currentLocation)
  const index = useSelector((state) => state.index)

  const dispatch = useDispatch()

  if (!currentLocation) {
    return <div>Loading...</div>
  }

  const buttonStyle = {
    fontSize: "12px",
    height: "25px",
    width: "75px"
  }

  const handleNext = () => {
    if (index === currentLocation.properties.presets.length - 1) {
        dispatch(setIndex(0))
    } else {
        dispatch(setIndex(index + 1))
    }
  }

  const handleSave = () => {
    dispatch(saveLocation(currentLocation))
    dispatch(setMessage({text: 'asema tallennettu', color: 'green'}))
    setTimeout(() => {
        dispatch(setMessage({text: '', color: ''}))
    }, 3000)
  }

  const handleDelete = () => {
    dispatch(deleteLocation(currentLocation))
    dispatch(setMessage({text: 'asema poistettu', color: 'red'}))
    setTimeout(() => {
        dispatch(setMessage({text: '', color: ''}))
    }, 3000)
  }

  
  return (
    <div style={{width: "220px", height: "220px"}}>
      <p style={{margin: "0"}}>Kameran suunta: {currentLocation.properties.presets[index].presentationName}</p>
      <img style={{width: "210px", height: "170px", borderRadius: "8px"}} src={currentLocation.properties.presets[index].imageUrl} alt="Image" />
      <div className="buttonDiv">
        {currentState === 'all' ? (
          <button onClick={handleSave} style={buttonStyle} className="nextButton">Tallenna</button>
        ) : (
          <button onClick={handleDelete} style={buttonStyle} className="nextButton">Poista</button>
        )}
        <button onClick={handleNext} style={buttonStyle} className="nextButton">Seuraava</button>
      </div>
    </div>
  )

}

export default StationLocationMarker