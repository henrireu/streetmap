import { MapContainer, TileLayer, LayersControl, Marker, LayerGroup, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import trafficServices from './services/trafficServices'
import TrafficMessage from './components/TrafficMessage'
import StationLocationMarker from './components/StationLocationMarker'

//https://www.digitraffic.fi/tieliikenne/#liikennetiedotteet

//seuraavaksi hae idn kanssa liikennekameroille kuvat

const FinlandMap = () => {
  const [messageData, setMessageData] = useState([])
  const [stationLocationData, setStationLocationData] = useState([])

  useEffect(() => {
    trafficServices.getTrafficMessages().then(messages => 
      setMessageData(messages)
    )
    trafficServices.getTrafficStationCoordinates().then(locations => 
      setStationLocationData(locations)
    )
  }, [])

  const finlandBounds = [
    [58.454157, 19.08328], 
    [71.092293, 31.586261], 
  ];

  return (
    <div className="mapdiv">
    <MapContainer
      center={[64.0, 26.0]} 
      zoom={6}
      scrollWheelZoom={true}
      maxBounds={finlandBounds}
      minZoom={5}
      style={{ height: "90vh", width: "90%", borderRadius: "4px", margin: "20px" }}
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
              <StationLocationMarker key={location.id} location={location}/>
            ))}
          </LayerGroup>
        </LayersControl.BaseLayer>
      </LayersControl>
    </MapContainer>
    </div>
  );
};

/*{data.map(message => (
  <Marker position={[message.geometry.coordinates[1], message.geometry.coordinates[0]]}></Marker>
))}*/

export default FinlandMap;