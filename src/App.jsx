import { useEffect } from 'react'
import Computer from "./Computer"
import { useDispatch, useSelector } from "react-redux"
import trafficServices from "./services/trafficServices"
import { setLocations } from "./reducers/locationReducer"
import Message from './components/Message'
import VersionControl from './components/versionControl'
import Info from './components/Info'

import Mobile from './Mobile'

// tee info painike oikealle ylös painettaessa tulee infoa sivusta ja kameroista yleisesti. se tulee 
// muun tavaran päälle

function App() {

  const dispatch = useDispatch()

  const version = useSelector((state) => state.version)

  useEffect(() => {
    trafficServices
      .getTrafficStationCoordinates().then(stationLocations => dispatch(setLocations(stationLocations)))
  },[])

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Karttasovellus</h1>
      <Info />
      <VersionControl />
      <Message />
      {version === 'computer' ? (
        <Computer />
      ) : (
        <Mobile />
      )}
      
    </div>
  )
}

export default App
