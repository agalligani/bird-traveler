import { useSelector, useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import "./styles.css"
import "./Location.css"
import 'reactjs-popup/dist/index.css'
import { updateRegion, updateRegionalCountryList } from "./locationSlice"
import axios from 'axios'
import config from "../../config"

/** RegionSelector selects from "regions" in some cases continents or actual regions - ie. Central America */
const RegionSelector = () => {

  const [regionSelected, setRegionSelected ] = useState('na')
  const dispatch = useDispatch()

  const regions = [
    {name: 'Africa', id: "af"},
    {name: 'Asia', id: "as"},
    {name: 'Europe', id: "eu"},
    {name: 'Central America', id: "ca"},
    {name: 'North America', id: "na"},
    {name: 'South America', id: "sa"}
  ]

    const {
        regionId,
        // regionSelected
    } = useSelector( 
        state => state.location
    )


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
      })} 
    }

    , [regionId])

    const setRegionSelect = (e) => {
      setRegionSelected(e.target.value)
    }

    const saveRegionSelect = (e) => {
      dispatch(updateRegion(regionSelected))
      setRegionSelected(null)
    }

    return (
      <form id="location_select_form">
        <h1>{regionId}</h1>
        {!regionId ?
        <select id="locRegion" className="location_select" onChange={(e) => setRegionSelect(e)} multiple>
             {
               regions.map(
                 (c,i) => <option key={i} value={c.id}>{c.name}</option>
               )
             }
           </select>
           :
           <>???</>
}
           {/* <a className="close" onClick={close}>
             &times;
           </a> */}
         {regionSelected ? (
           <button className="close" onClick={() => saveRegionSelect()}>
             Save Region
           </button>
           ) 
         : ( <></>)}
      </form>
    )
}

export default RegionSelector