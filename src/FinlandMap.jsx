import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import trafficServices from './services/trafficServices'
import TrafficMessage from './components/TrafficMessage'
import StationLocationMarker from './components/StationLocationMarker'
import StationPictureDiv from './components/StationPictureDiv'
import { useSelector, useDispatch } from 'react-redux'

//https://www.digitraffic.fi/tieliikenne/#liikennetiedotteet

//POISTA NAPPULA NÄKYY AINA MUTTA JOSTAIN SYYSTÄ FUNKTIO EI TOIMI

const FinlandMap = () => {
  const [messageData, setMessageData] = useState([])
  const [stationLocationData, setStationLocationData] = useState([])
  const [stationData, setStationData] = useState(null)
  //const [savedLocations, setSavedLocations] = useState([])

  const savedLocations = useSelector((state) => state.savedLocations)

  useEffect(() => {
    trafficServices.getTrafficMessages().then(messages => 
      setMessageData(messages)
    )
    trafficServices.getTrafficStationCoordinates().then(locations => 
      setStationLocationData(locations)
    )
  }, [])

  return (
    <div className="mapdiv">
      <button onClick={() => console.log(savedLocations)}>testi</button>
      <MapContainer
        center={[64.0, 26.0]} 
        zoom={6}
        scrollWheelZoom={true}
        minZoom={4}
        style={{ height: "60vh", width: "45%", borderRadius: "4px", margin: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">

          <LayersControl.BaseLayer checked name="Liikennekamerat">
            <LayerGroup>
              {stationLocationData.map(location => (
                <StationLocationMarker 
                  key={location.id} 
                  location={location} 
                  setStationData2={setStationData}
                  saved={false}
                />
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Tallennetut kamerat">
            <LayerGroup>
              {savedLocations.map(location => (
                <StationLocationMarker 
                  key={location.id} 
                  location={location} 
                  setStationData2={setStationData}
                  saved={true}
                />
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Liikennetiedotteet">
            <LayerGroup> 
              {/*messageData.map(message => (
                <TrafficMessage key={message.properties.situationId} message={message}/>
              ))*/}
            </LayerGroup>
          </LayersControl.BaseLayer>

        </LayersControl>
      </MapContainer>

      <StationPictureDiv stationData={stationData}/>

    </div>
  )
}

export default FinlandMap;