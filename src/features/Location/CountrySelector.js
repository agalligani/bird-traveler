import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { updateCountry, updateSubnational1List } from "./locationSlice"
import "./styles.css"
// import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css'
import axios from "axios"
import config from "../../config"

const CountrySelector = () => {
  const [countryName, setCountryName] = useState("")
    const {
        regionId,
        countryId,
        regionalCountryList
          } = useSelector( 
        state => state.location
    )

    let requestConfig = config.axiosConfig
    requestConfig.url = `https://api.ebird.org/v2/ref/region/list/country/${regionId}`

    const dispatch = useDispatch()
    const setCountryValue = (e) => {
      dispatch(updateCountry(e.target.value))
      const iterator = regionalCountryList.values();
      for (const value of iterator) {
        if (value.code === e.target.value) {
          setCountryName(value.name);
        }
      }
    }

  return (
      <div>
        <h4>{countryId}</h4>
        <select className="location_select" multiple>
        {regionalCountryList.map(
          (c,i) => <option key={i} value={c.code} onClick={
            (e) => setCountryValue(e)
          }>{c.name}</option>
        )}
        </select>
      </div>
    )
  }

export default CountrySelector