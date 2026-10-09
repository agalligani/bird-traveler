import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import "./styles.css"
import "./Location.css"
import 'reactjs-popup/dist/index.css'
import { updateLocation, updateSubnational1List, updateLocationMessage } from "./locationSlice"
import axios from "axios"
import config from "../../config"

const LocationSelector = () => {

  const [locationSelected, setLocationSelected ] = useState(null)
  const dispatch = useDispatch()

    const {
        locId,
        locFavorites,
        countryName,
        countryId,
        subnational1List
    } = useSelector( 
        state => state.location
    )

    useEffect(
      () => {
      let requestConfig = config.axiosConfig
      requestConfig.url = `https://api.ebird.org/v2/ref/region/list/subnational1/
      ${countryId}`
      axios(requestConfig)
      .then(res => res.data)
      .then(
        data => {
          if (data.length === 0) {
          dispatch(updateLocationMessage("Create birdlist for " + countryName))
            return;
          } else {
          // dispatch(updateLocationMessage("Select the province, state or county in " + countryName +" to search"))
          dispatch(updateSubnational1List(data))
          }})
      .catch(function (error) {
      console.log(error)
      })
    }
    , [countryId])

    const setLocationSelect = (e) => {
      setLocationSelected(e.target.value)
    }

    const saveLocationSelect = (e) => {
      dispatch(updateLocation(locationSelected))
      setLocationSelected(null)
    }

  return (
      <form id="locForm">
        <select id="locSelect" className="locations_select" onChange={(e) => setLocationSelect(e)}>
          {
            subnational1List ? 
              subnational1List.map(
                (l,i) => {
                  return <option key={i} value={l.code}>{l.name}</option>
              }
              )
              :
              <></>
            
          }
        </select>
        {locationSelected ? ( 
          <button className="close" onClick={() => saveLocationSelect()}>
            Save Location
          </button>
          ) 
        : ( <></>)}
      </form>)
}
export default LocationSelector