import { useDispatch, useSelector } from 'react-redux'
import { saveLocation, deleteLocation } from '../reducers/savedLocationReducer'
import { setMessage } from '../reducers/messageReducer'
import { setIndex } from '../reducers/indexReducer'

const StationPictureDiv = ({ currentState }) => {
    const dispatch = useDispatch()

    const currentLocation = useSelector((state) => state.currentLocation)
    const index = useSelector((state) => state.index)

    const handleNext = () => {
        if (index === currentLocation.properties.presets.length - 1) {
            dispatch(setIndex(0))
        } else {
            dispatch(setIndex(index + 1))
        }
    }

    const handleSave = () => {
        dispatch(saveLocation(currentLocation))
        dispatch(setMessage('asema tallennettu'))
        setTimeout(() => {
            dispatch(setMessage(""))
        }, 3000)
    }

    const handleDelete = () => {
        dispatch(deleteLocation(currentLocation))
        dispatch(setMessage('asema poistettu'))
        setTimeout(() => {
            dispatch(setMessage(""))
        }, 3000)
    }

    if (currentLocation !== null) {
        return (
            <div style={divStyle}>
              <h3 style={{margin: "1px"}}>{currentLocation.properties.names.fi}</h3>
              <p style={{margin: "1px"}}>Kameran suunta: {currentLocation.properties.presets[index].presentationName}</p>
              <img style={{ width: "85%", height: "100%", borderRadius: "4px"}} src={currentLocation.properties.presets[index].imageUrl} alt="Image" />
              <div className="buttonDiv">
                {currentState === 'all' ? (
                  <button onClick={handleSave} className="nextButton left">Tallenna</button>
                ) : (
                  <button onClick={handleDelete} className="nextButton left">Poista</button>
                )}
                <button onClick={handleNext} className="nextButton right">Seuraava</button>
              </div>
            </div>
        )
    }

    return (
        <div style={divStyle} className="natural-green">
            <h1>valitse kamera!</h1>
        </div>
    )  
}

const divStyle = {
    display: "flex",
    flexDirection: "column", 
    alignItems: "center", 
    height: "60vh", 
    width: "45%", 
    borderRadius: "8px", 
    margin: "20px",
    gap: "1px",
    backgroundColor: "#d9d9d9",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)"
}

export default StationPictureDiv