/** Subnational2 selects from "subnational2" within a subnational1 
  and populates the subnational2 list for the selected subnational1,
  where available and updates the location state accordingly.
*/

/**
 * Subnational2 component
 * Fetches and displays subnational2 regions for a given subnational1 location.
 */

/**
 * The eBird API currently supports subnational2 codes (such as 
 * counties or equivalent local administrative districts) for only 
 * India, United States, New Zealand, Mexico, Australia, Brazil
 * Argentina and Canada (that I know of imperically).
 * Tested for China, Russia, and Colombia but not there.
 */

import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useState, useEffect } from "react"
import { 
  updateSubnational2List, 
  updateSubnational2Name,
  updateLocation, 
  updateLocationMessage } from "./locationSlice"
import "./styles.css"
import config from "../../config"   

const Subnational2 = () => {

    const dispatch = useDispatch()
    const { locId, subnational2List} = useSelector(
        (state) => state.location
    )
    useEffect(
      () => {
      let requestConfig = config.axiosConfig
      requestConfig.url = `https://api.ebird.org/v2/ref/region/list/subnational2/${locId}`
      console.log("Requesting subnational2 data for locId:", locId)
      axios(requestConfig)
      .then(res => res.data)
      .then(
        data => {
          if (data.length === 0) {
            console.log("No subnational2 data found for locId:", locId)
          // dispatch(updateLocationMessage("Create birdlist for " + countryName))
            return;
          } else {
                        console.log("# of locations found for locId:", locId, data.length)

          dispatch(updateSubnational2List(data))
          }})
      .catch(function (error) {
      console.log(error)
      })
    }
    , [locId])

}
export default Subnational2

