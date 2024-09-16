import { useState } from "react"
import '../styles/info.css'

const Info = () => {
  const [showInfo, setShowInfo] = useState(false)

  const handleInfo = () => {
    setShowInfo(!showInfo);
  }

  return (
    <div style={{position: 'relative', display: 'flex', justifyContent: 'flex-end'}}>
      <button onClick={handleInfo} className='info-button' style={{ marginRight: '5%' }}>i</button>
      {showInfo && (
        <InfoDiv handleInfo={handleInfo} />
      )}
    </div>
  )
}

// eslint-disable-next-line react/prop-types
const InfoDiv = ({ handleInfo }) => {
  return (
    <div className="info-div">
      <div className="info-header">
        <button onClick={handleInfo}>x</button>
      </div>
      <p className="info-content">
        Tämä karttasovellus tarjoaa lähes realiaikaista kuvamateriaalia yli 600 liikennekamerasta ympäri Suomea. <br /> <br /> 
        Kameroiden kuvat päivittyvät 10 minuutin välein. <br />  <br />  
        Voit tallentaa yksittäisiä liikennekameroita. Ne löytyvät kartan oikeassa yläkulmassa olevasta valikosta. <br />  <br />
        Kaikki data haetaan fintraffick-sivustolta. 
      </p>
    </div>
  )
}

export default Info;