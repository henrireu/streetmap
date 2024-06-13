import { useEffect } from 'react'
import FinlandMap from "./FinlandMap"
import { useDispatch } from "react-redux"
import trafficServices from "./services/trafficServices"
import { setLocations } from "./reducers/locationReducer"
import Message from './components/Message'

function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    trafficServices
      .getTrafficStationCoordinates().then(stationLocations => dispatch(setLocations(stationLocations)))
  },[])

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Karttasovellus</h1>
      <Message />
      <FinlandMap />
    </div>
  )
}

export default App
