import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import "./styles.css"
import "./Location.css"
import 'reactjs-popup/dist/index.css'
import { updateRegion, updateRegionalCountryList, updateLocation, updateLocationMessage } from "./locationSlice"
import axios from 'axios'
import config from "../../config"

/** RegionSelector selects from "regions" in some cases continents or actual regions - ie. Central America */
const RegionSelector = () => {
  const [regionSelected, setRegionSelected ] = useState('na')
  const dispatch = useDispatch()
    const {
        regions,
        regionId,
        locMessage
    } = useSelector(state => state.location)
    
    useEffect(
      () => {
        let requestConfig = config.axiosConfig
        if (regionId)  
          {
          requestConfig.url = `https://api.ebird.org/v2/ref/region/list/country/${regionId}`
          axios(requestConfig)
          .then(res => res.data)
          .then( data => {
            dispatch(updateRegionalCountryList(data))
            })
            .catch(function (error) {
              console.log(error)
            })
          } 
      }
      , [regionId]
    )

    const setRegionSelect = (e) => {
      setRegionSelected(e.target.value)
      dispatch(updateRegion(e.target.value))
    }

    return (
      <form id="location_select_form" >
        <h1 id="region_id">{regionId}</h1>
        <h5 id="loc_message">{locMessage}</h5>
        <select id="locRegion" 
          className="location_select visible"
            onChange={
              (e) => {                
                let region_id_h1 = document.getElementById('region_id')
                let loc_message_h2 = document.getElementById('loc_message')
                let locRegion_select = document.getElementById('locRegion')
                region_id_h1.classList.remove('visible')
                loc_message_h2.classList.remove('visible')
                locRegion_select.classList.remove('visible')
                region_id_h1.classList.add('fade_out')
                // loc_message_h2.classList.add('fade_out')
                locRegion_select.classList.add('fade_out')
                setRegionSelect(e)
                dispatch(updateLocation(e.target.value))
                let regionName = regions.find(region => region.id === e.target.value);
                dispatch(updateLocationMessage("Select the country or territory in " + regionName.name +" to search"))
              }} multiple>
             {
               regions.map(
                 (c,i) => 
                  <option key={c.name} value={c.id}>
                    {c.name}
                 </option>
               )
             }
           </select>
      </form>
    )
}

export default RegionSelector