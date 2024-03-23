import { useSelector } from "react-redux"
import RegionSelector from "./RegionSelector"
import CountrySelector from "./CountrySelector"
import LocationSelector from "./LocationSelector"
import "./Location.css"
// import { useMemo } from "react"


const Location = () => {
  
  const {
    regionId,
    locId,
    // locFavorites
  } = useSelector(
    (state) => state.location 
  )
  
  return (
    <>
    {/* <h3>{locId}</h3>
      <CountrySelector /> */}
    <h3>{locId}</h3>
      <RegionSelector />
      <CountrySelector />
      <LocationSelector />
    </>
  )
}
export default Location