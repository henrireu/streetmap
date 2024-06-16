import { MapContainer, TileLayer, LayersControl, LayerGroup } from 'react-leaflet'
import { useState } from 'react'
import StationLocationMarker from './components/StationLocationMarker'
import StationPictureDiv from './components/StationPictureDiv'
import { useSelector } from 'react-redux'

//https://www.digitraffic.fi/tieliikenne/#liikennetiedotteet

// sitten tyyliparannuksia ja mediaqueryllä eri näyttökokoille sopivaksi
// tee jossain kohtaa vielä eri kategoria että näyttää vain maisema kuvat

const FinlandMap = () => {
  const [currentState, setCurrentState] = useState('all')

  const locations = useSelector((state) => state.locations)
  const savedLocations = useSelector((state) => state.savedLocations)
  const currentLocation = useSelector((state) => state.currentLocation)

 
  return (
    <div className="mapdiv">
      {/*<button onClick={() => console.log(currentLocation)}>testi</button>*/}
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
            <LayerGroup
              eventHandlers={{
                add: (e) => {
                  setCurrentState('all')
                }
            }}>
              {locations.map(location => (
                <StationLocationMarker key={location.id} location={location} />
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>

          <LayersControl.BaseLayer name="Tallennetut kamerat">
            <LayerGroup 
              eventHandlers={{
                add: (e) => {
                  setCurrentState('saved')
                }
              }}
            >
              {savedLocations.map(location => (
                <StationLocationMarker key={location.id} location={location} />
              ))}
            </LayerGroup>
          </LayersControl.BaseLayer>

        </LayersControl>
      </MapContainer>

      <StationPictureDiv currentState={currentState}/>

    </div>
  )
}

export default FinlandMap;