import { useDispatch, useSelector } from 'react-redux'
import { saveLocation, deleteLocation } from '../reducers/savedLocationReducer'
import { setMessage } from '../reducers/messageReducer'
import { setIndex } from '../reducers/indexReducer'

import LappiImg from '../../public/Lappi.jpg';

// eslint-disable-next-line react/prop-types
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

    if (currentLocation !== null) {
        return (
            <div className="picturediv">
              <h3 style={{margin:"0"}}>{currentLocation.properties.names.fi}</h3>
              <p style={{margin: "0"}}>Kameran suunta: {currentLocation.properties.presets[index].presentationName}</p>
              <p style={{margin: "0"}}>Kuva: {index + 1}/{currentLocation.properties.presets.length}</p>
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
        <div className="picturediv">
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
            <img
              src={LappiImg}
              alt="Kuva lapista"
              style={{ width: '100%', height: '100%', opacity: '0.5' }}
            />
            <h1
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                color: '#2c3e50',
                fontSize: '2rem',
                //backgroundColor: 'rgba(0, 0, 0, 0.5)',
                padding: '10px',
                borderRadius: '8px',
              }}
            >
              Valitse kamera vasemmalla puolella olevasta kartasta
            </h1>
          </div>
        </div>
    )  
}

export default StationPictureDiv