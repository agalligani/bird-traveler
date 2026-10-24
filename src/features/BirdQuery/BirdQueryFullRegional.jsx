import {
    updateRegionalSpeciesList,
    setSpeciesDescriptions,
    updateGroupedSpecies
        } from './birdQuerySlice'
import {
    locId,
    locName
        } from '../Location/locationSlice'

import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from 'react-redux'
// import BirdPhoto from './BirdPhoto/BirdPhoto'
import BirdPhoto from './BirdPhoto/BirdPhoto'
import axios from 'axios'
import config from "../../config"
import {chunkArray} from '../../utils'

// import ImageGallery from '../../components/ImageGallery'
const BirdQueryFullRegional = () => {
    const dispatch = useDispatch()
    const {
        regionalSpeciesList,
        speciesDescriptions,
        groupedSpecies
    } = useSelector( (state) => state.birdQuery)

    const {
        locId,
        locName
    } = useSelector( (state) => state.location)

    const {
        speciesGrouping
    } = useSelector( (state) => state.speciesGrouping)

    let requestConfig = config.axiosConfig
    const speciesListForARegion = () => {
        const url = `https://api.ebird.org/v2/product/spplist/${locId}\n`
        requestConfig.url = url
        axios(requestConfig).then(
            //@todo add thunk function to handle this dispatch and automatically dispatch remaining
            // tewo functions
            // async res => {result = await dispatch(updateRegionalSpeciesList(res.data)).unwrap()
            res => dispatch(updateRegionalSpeciesList(res.data))
        ).catch((error) => {
            console.log(error.message)
            }
        )
    }

    const populateSpeciesDetails = (speciesList) => {
            let chunkedSpeciesList = chunkArray(speciesList.regionalSpeciesList, 30)
            chunkedSpeciesList.forEach(
                (chunk, i) => {
                    const taxonConfig = config.axiosConfig
                    taxonConfig.url = `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${chunk.join(",")}&fmt=json`
                    axios(taxonConfig).then( (res) => {
                        res.data.forEach(
                            (species, j) => {
                                dispatch(setSpeciesDescriptions(species))
                            }
                        )
                    }).catch( (err) => {
                        console.log(err.message)
                    })
                }
            )
        }

    /*** GROUP SPECIES ****/
    const orderSpeciesByGrouping = () => {
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
        dispatch(updateGroupedSpecies(finalFilteredGroups))
    }

    const queryButton = {regionalSpeciesList}.length || 
        <button onClick={() => speciesListForARegion()}>
            Run Query for {locName} ({locName})
        </button>

    const populateDetailsButton = {regionalSpeciesList}.length || 
        <button onClick={() => populateSpeciesDetails({regionalSpeciesList})}>
            Populate Taxon Info
        </button>

    const orderSpeciesButton = {regionalSpeciesList}.length || 
        <button onClick={() => orderSpeciesByGrouping()}>
            Order Species
        </button>
        
  return (
        <>
            <div className="col-middle-box" id="bird-query-full-regional">
            <div id="locName" className="location_name">{locName}:</div>

            { groupedSpecies.length ? 
                groupedSpecies.map(
                    fgroups => { 
                        return fgroups.map(
                            (n,i) => 
                            <>
                            <div key={"group-heading"+i} className="group-heading" id={n.groupOrder}>
                                {n.groupName}
                            </div>
                            <ul key={"image-gallery"+i} className="image-gallery">
                                {n.speciesList.map(
                                    (species,k) =>
                                    <li key={k}>
                                    <div>speciesCode: {species.speciesCode}</div>
                                    <a key={"image-link-"+i+"-"+k} className="image-link" href={`https://ebird.org/species/${species.speciesCode}\n`} target="_blank">
                                        {/* <BirdPhoto key={"bird-photo-"+i+"-"+k} speciesName={species.comName}/> */}
                                        <BirdPhoto key={"bird-photo-"+i+"-"+k} speciesName={species.comName} speciesCode={species.speciesCode}/>
                                    </a>
                                    </li>
                                )}
                            </ul>
                            </>
                        )
                    }
                    )
                    :  
                    <div key="query-buttons" className="query-buttons">
                        {queryButton}
                        {populateDetailsButton}
                        {orderSpeciesButton}
                    </div> 
                }
                </div>
        </>
    )
}

export default BirdQueryFullRegional