import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { updateCountry, updateCountryName, updateSubnational1List, updateLocation, updateLocationMessage } from "./locationSlice"
import { SouthAmericanCountryCodes } from "./countryCodes/countryCodes"
import "./styles.css"
import 'reactjs-popup/dist/index.css'
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
        <select id="countryList" className="location_select" multiple>
        {regionalCountryList.map(
          (c,i) => <option key={i} value={c.code} onClick={
            (e) => {
              let countryList = document.getElementById('countryList')
              countryList.classList.add('fade_out')
              setCountryValue(e)
              dispatch(updateLocation(e.target.value))
              dispatch(updateCountryName(c.name))
              dispatch(updateLocationMessage("Select the province, state or county in " + c.name +" to search"))
            }
          }>{c.name}</option>
        )}
        </select>
      </div>
    )
  }

export default CountrySelector