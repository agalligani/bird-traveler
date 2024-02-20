import { useSelector } from "react-redux"
import CountrySelector from "./CountrySelector"
import LocationSelector from "./LocationSelector"
// import { useMemo } from "react"


const Location = () => {
  
  const {
    locId,
    locFavorites
  } = useSelector(
    (state) => state.location 
  )
  
  return (
    <>
    <h1>Location</h1>
    <h3>{locId}</h3>
      <CountrySelector />
    <h3>{locId}</h3>
      <LocationSelector />
    </>
  )
}
export default Location