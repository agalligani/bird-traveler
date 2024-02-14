import { useDispatch, useSelector } from "react-redux";
import { setFilteredSpeciesGrouping } from "./speciesGroupingSlice"
const SpeciesGrouping = () => {

    const dispatch = useDispatch()

    const {
        speciesDescriptions
    } = useSelector( (state) => state.birdQuery)

    const {
        speciesGrouping
    } = useSelector( (state) => state.speciesGrouping)

    /*** GROUP SPECIES (groupSpecies) */
    const groupSpecies = () => {
            var filteredGroups = []
            var speciesList = []
            var finalFilteredGroups = []

            speciesGrouping[0].forEach(
                n => {
                speciesList  = speciesDescriptions.filter(
                        (sl) => sl.taxonOrder > (n.taxonOrderBounds[0][0] - 1)
                                &&
                                sl.taxonOrder < (n.taxonOrderBounds[0][1] + 1))
                filteredGroups.push(
                        {   
                            "groupName" : n.groupName, 
                            "groupOrder" : n.groupOrder,
                            "taxonUpper" : n.taxonOrderBounds[0][0],
                            "taxonLower" : n.taxonOrderBounds[0][1],
                            "speciesList" : speciesList
                        }
                )})
                finalFilteredGroups = filteredGroups.filter(
                    group => group.speciesList.length > 0
                )
                console.log(speciesDescriptions)

            dispatch(setFilteredSpeciesGrouping(finalFilteredGroups))
    }
    return (<button onClick={() => groupSpecies()}>Group Species</button>)
  }
  export default SpeciesGrouping