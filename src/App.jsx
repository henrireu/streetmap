import FinlandMap from "./FinlandMap"
import { useSelector } from "react-redux"
import messageReducer from "./reducers/messageReducer"

function App() {

  const message = useSelector((state) => state.message)

  return (
    <div>
      <h1 style={{textAlign: "center"}}>Karttasovellus</h1>
      {message !== "" && (
        <div className="message">
          {message}
        </div>
      )}
      <FinlandMap />
    </div>
  )
}

export default App
