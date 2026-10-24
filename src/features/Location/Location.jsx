import { useSelector } from "react-redux"
import RegionSelector from "./RegionSelector"
import CountrySelector from "./CountrySelector"
import LocationSelector from "./LocationSelector"
import Subnational2 from "./Subnational2"
import "./Location.css"
import HotSpots from "./HotSpots"
import Menu from "../../components/Menu"

const Location = () => {  
  const {
    regionId,
    locId,
    locName
  } = useSelector(
    (state) => state.location
  )
  
  return (
    <>
    <div>{locId ? "Location: " + locId : regionId ? "Region: " + regionId : "Select Location"}</div>
      {/* <span>{locName}</span> */}
      <RegionSelector />
      <CountrySelector />
      <LocationSelector />
      {/* <Subnational2 /> */}
      <HotSpots />
          <button onClick={() => window.scrollTo({ top: 10, behavior: "smooth" })} id="topBtn" title="Go to top">Top</button>
    </>
  )
}
export default Location