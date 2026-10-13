import { useSelector, useDispatch } from "react-redux"
import axios from "axios"
import { useState, useEffect } from "react"
import { 
  updateHotSpots,
  updateSubnational2Name,
  updateLocation, 
  updateLocationMessage } from "./locationSlice"
import HotSpotNavPills from "../../components/HotSpotNavPills"
import "./styles.css"
import config from "../../config"

const HotSpots = () => {
    
    const dispatch = useDispatch()
    const { locId, hotSpots, countryCode} = useSelector(
        (state) => state.location
    )
    useEffect(
      () => {
      let requestConfig = config.axiosConfig
      requestConfig.url = `https://api.ebird.org/v2/ref/hotspot/${locId}?fmt=json`
      console.log("Requesting hotspots data for locId:", locId)
      axios(requestConfig)
      .then(res => res.data)
      .then(
        data => {
          if (data.length === 0) {
            console.log("No hotspots data found for locId:", locId)
            return;
          } else {            
            console.log("# of hotspots found for locId:", locId, data)
            dispatch(updateHotSpots(data))
          }})
      .catch(function (error) {
      console.log(error)
      })
    }
    , [locId])

    return (
        <div>
            <p>Hot Spots for Location ID: {countryCode}</p>
               <HotSpotNavPills />
        </div>
    )
}
export default HotSpots