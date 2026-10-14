/** This component renders a navigation pill for selecting hot spots.
 *  It allows the user to choose a location from a dropdown list and 
 * dispatches an action to update the selected location.
 * 
 * It is used and imported into HotSpots.jsx but probably should exist
 * in a different file for better organization.
 */
import { useSelector, useDispatch } from "react-redux"
import { useState } from "react"
// import { updateLocation } from "../actions/location"
import { updateLocation, updateLocationMessage } from "../features/Location/locationSlice"

const HotSpotNavPills = () => {

    const [locationSelected, setLocationSelected ] = useState(null)
    const dispatch = useDispatch()

    const setLocationSelect = (e) => {
        console.log("Hotspot selected:", e.target.value)
        setLocationSelected(e.target.value)
        saveLocationSelect(e)
    }
    
    const saveLocationSelect = (e) => {
        dispatch(updateLocation(locationSelected))
        // setLocationSelected(null)
    }

    const {hotSpots,} = useSelector( (state) => state.location)

    return (
    <ul className="nav nav-pills">
    { hotSpots.length ? 
                <select onChange={(e) => setLocationSelect(e)}  >
                    {hotSpots.map(
                        (n,i) => 
                        <option key={"li-"+i} value={n.locId} className="nav-item">
                            {n.locName}
                        </option>
                    )}
                </select>
        :  <></>
    }
</ul>  
)
}
export default HotSpotNavPills

