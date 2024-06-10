import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useState, useEffect } from 'react'
import trafficServices from './services/trafficServices'
import TrafficMessage from './components/TrafficMessage'
import StationLocationMarker from './components/StationLocationMarker'
import StationPictureDiv from './components/StationPictureDiv';

//https://www.digitraffic.fi/tieliikenne/#liikennetiedotteet

//seuraavaksi hae idn kanssa liikennekameroille kuvat

const FinlandMap = () => {
  const [messageData, setMessageData] = useState([])
  const [stationLocationData, setStationLocationData] = useState([])
  const [stationData2, setStationData2] = useState(null)

  useEffect(() => {
    trafficServices.getTrafficMessages().then(messages => 
      setMessageData(messages)
    )
    trafficServices.getTrafficStationCoordinates().then(locations => 
      setStationLocationData(locations)
    )
  }, [])

  /*const finlandBounds = [
    [45.816021, 6.580299],
  [83.049497, 44.089242],
  ];*/

  return (
    <div className="mapdiv">
      <MapContainer
        center={[64.0, 26.0]} 
        zoom={6}
        scrollWheelZoom={true}
        minZoom={5}
        style={{ height: "60vh", width: "45%", borderRadius: "4px", margin: "20px" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <LayersControl position="topright">
          <LayersControl.BaseLayer name="Liikennetiedotteet">
            <LayerGroup>
              {messageData.map(message => (
                <TrafficMessage key={message.properties.situationId} message={message}/>
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Liikennekamerat">
            <LayerGroup>
              {stationLocationData.map(location => (
                <StationLocationMarker key={location.id} location={location} setStationData2={setStationData2}/>
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>
        </LayersControl>
      </MapContainer>

      <StationPictureDiv stationData={stationData2}/>
      
    </div>
  )
}

export default FinlandMap;