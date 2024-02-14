//Species grouping menu loads the master grouping list and then
//present a filtered version for selection based on the appropriate
//species in the master species list
import { updateSpeciesGrouping, setFilteredSpeciesGrouping } from "./speciesGroupingSlice" 
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from "../../config"
import SpeciesGrouping from "../SpeciesGrouping/SpeciesGrouping"
import { useEffect } from "react"

const SpeciesGroupingMenu = () => {

    const dispatch = useDispatch()
    const {
        speciesGrouping,
    } = useSelector( (state) => state.speciesGrouping)


    const loadSpeciesGroupings = () => {
        let axiosConfig = config
        axiosConfig.url = `https://api.ebird.org/v2/ref/sppgroup/merlin\n`
        axios(axiosConfig)
            .then(res => res.data.length ? 
                dispatch(updateSpeciesGrouping(res.data)) 
                : "" )
            .catch( err => err.message)
    }

    useEffect(
        () => {loadSpeciesGroupings()}, []
    )

  return (
        <>
        <div className="col col-30">
            <h4>Organize Species By Group</h4>
            <SpeciesGrouping/>
        </div>
        </>
    )
}

export default SpeciesGroupingMenu