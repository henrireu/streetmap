import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { saveLocation, deleteLocation } from '../reducers/savedLocationReducer'
import { setMessage } from '../reducers/messageReducer'

const StationPictureDiv = ({ stationData, currentState }) => {
    const [index, setIndex] = useState(0)
    const [loading, setLoading] = useState(true)

    const dispatch = useDispatch()

    const currentLocation = useSelector((state) => state.currentLocation)

    useEffect(() => {
        setLoading(true)
        const loadingFunction = () => {
            setTimeout(() => {
                setLoading(false)
            }, 1000)
        }
        loadingFunction()
    },[currentLocation])

    const handleNext = () => {
        if (index === currentLocation.properties.presets.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }

    const handleSave = () => {
        console.log(stationData)
        dispatch(saveLocation(stationData))
        dispatch(setMessage('asema tallennettu'))
        setTimeout(() => {
            dispatch(setMessage(""))
        }, 3000)
    }

    const handleDelete = () => {
        dispatch(deleteLocation(stationData))
        dispatch(setMessage('asema poistettu'))
        setTimeout(() => {
            dispatch(setMessage(""))
        }, 3000)
    }

    if (loading) {
        return (
            <div style={divStyle} className="loading-screen">
                <h1>Loading...</h1>
            </div>
        )
    }

    if (currentLocation !== null && loading === false) {
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

    /*if (stationData !== null) {
        return (
            <div style={divStyle}>
              <h3 style={{margin: "1px"}}>{stationData.properties.names.fi}</h3>
              <p style={{margin: "1px"}}>Kameran suunta: {stationData.properties.presets[index].presentationName}</p>
              <img style={{ width: "85%", height: "100%", borderRadius: "4px"}} src={stationData.properties.presets[index].imageUrl} alt="Image" />
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
    } */

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