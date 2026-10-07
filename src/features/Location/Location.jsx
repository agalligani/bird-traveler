import { useSelector } from "react-redux"
import RegionSelector from "./RegionSelector"
import CountrySelector from "./CountrySelector"
import LocationSelector from "./LocationSelector"
import "./Location.css"

const Location = () => {
  
  const {
    regionId,
    locId,
  } = useSelector(
    (state) => state.location
  )
  
  return (
    <>
    <h3>{locId}</h3>
      <RegionSelector />
      <CountrySelector />
      <LocationSelector />
    </>
  )
}
export default Location