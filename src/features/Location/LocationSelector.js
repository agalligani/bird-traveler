import { useSelector } from "react-redux";
import "./styles.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const LocationSelector = () => {

    const {
        locId,
        locFavorites
    } = useSelector( 
        state => state.location
    )

  return (
    <Popup trigger={<button>Select Location(s):</button>} modal>
    {close => (
      <div>
        <select>
          <option value="L5840833">Tambopata Ecolodge</option>
          <option value="L3971768">Manu National Park</option>
          <option value="L602498">Puerto Maldonado</option>
        </select>
        <a className="close" onClick={close}>
          &times;
        </a>
      </div>
    )}
  </Popup>  )
}
export default LocationSelector