import '../styles/versionControl.css'
//import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setVersion } from '../reducers/versionControlReducer';

const VersionControl = () => {
    //const [version, setVersion] = useState('desktop');

    const dispatch = useDispatch()
    const version = useSelector((state) => state.version)
  
    const handleVersionChange = (event) => {
      //setVersion(event.target.value)
      dispatch(setVersion(event.target.value))
    };
  
    return (
      <div className="version-control">
        <div className="validiv">
        <label className="radio-container">
          Näytä kartta ja kuva
          <input
            type="radio"
            name="version"
            value="computer"
            checked={version === 'computer'}
            onChange={handleVersionChange}
          />
          <span className="checkmark"></span>
        </label>
        <label className="radio-container">
          Näytä kuva kartan päällä
          <input
            type="radio"
            name="version"
            value="mobile"
            checked={version === 'mobile'}
            onChange={handleVersionChange}
          />
          <span className="checkmark"></span>
        </label>
        </div>
      </div>
    );
  };
  
  export default VersionControl;