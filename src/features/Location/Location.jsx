import { useSelector } from "react-redux"
import RegionSelector from "./RegionSelector"
import CountrySelector from "./CountrySelector"
import LocationSelector from "./LocationSelector"
import Subnational2 from "./Subnational2"
import "./Location.css"
import HotSpots from "./HotSpots"

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
      {/* <Subnational2 /> */}
      <HotSpots />
    </>
  )
}
export default Location