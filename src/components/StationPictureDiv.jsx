import { useState } from 'react'

const StationPictureDiv = ({ stationData }) => {
    const [index, setIndex] = useState(0)

    const handleClick = () => {
        if (index === stationData.presets.length - 1) {
            setIndex(0)
        } else {
            setIndex(index + 1)
        }
    }
    if (stationData !== null) {
        return (
            <div style={divStyle}>
              <h3 style={{margin: "1px"}}>{stationData.names.fi}</h3>
              <p style={{margin: "1px"}}>Kameran suunta: {stationData.presets[index].presentationName}</p>
              <img style={{ width: "85%", height: "100%", borderRadius: "4px"}} src={stationData.presets[index].imageUrl} alt="Image" />
              <button onClick={handleClick} className="nextButton">seuraava</button>
            </div>
        )
    } 

    return (
        <div style={divStyle} className="natural-green">
            {/*<img style={{ width: "85%", height: "100%", borderRadius: "4px"}} src={"https://weathercam.digitraffic.fi/C0450701.jpg"} alt="Image" />*/}
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