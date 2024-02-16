import {
    updateRegionalSpeciesList,
    setSpeciesDescriptions,
    updateGroupedSpecies
        } from './birdQuerySlice'
import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from 'react-redux'
import BirdPhoto from './BirdPhoto/BirdPhoto'
import axios from 'axios'
import config from "../../config"
import ImageGallery from '../../components/ImageGallery'


const BirdQueryFullRegional = () => {
    const dispatch = useDispatch()
    const {
        regionalSpeciesList,
        speciesDescriptions,
        groupedSpecies
    } = useSelector( (state) => state.birdQuery)

    const {
        locId,
    } = useSelector( (state) => state.location)

    const {
        speciesGrouping,
        filteredSpeciesGrouping
    } = useSelector( (state) => state.speciesGrouping)

    let requestConfig = config.axiosConfig
    const speciesListForARegion = () => {
        const url = `https://api.ebird.org/v2/product/spplist/${locId}\n`
        requestConfig.url = url
        axios(requestConfig).then(
            res => dispatch(updateRegionalSpeciesList(res.data))
        ).catch((error) => {
            console.log(error.message)
            }
        )
    }

    const populateSpeciesDetails = (speciesList) => {
            console.log("processSpeciesTaxonomy")
            console.log(speciesList)
            speciesList.regionalSpeciesList.forEach(
                (species, i) => {
                    const taxonConfig = config.axiosConfig
                    taxonConfig.url = `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${species}&fmt=json`
                    axios(taxonConfig).then( (res) => {
                        dispatch(setSpeciesDescriptions(res.data[0]))
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
        console.log(speciesGrouping[0])
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
            // console.log(filteredGroups)
            finalFilteredGroups = filteredGroups.filter(
                group => group.speciesList.length > 0
            )
            // console.log(speciesDescriptions)

        // dispatch(setFilteredSpeciesGrouping(finalFilteredGroups))
        dispatch(updateGroupedSpecies(finalFilteredGroups))
    }

    

    const queryButton = {regionalSpeciesList}.length || 
        <button onClick={() => speciesListForARegion()}>
            Run Query
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
            <div className="col col-30">
                <h4>Location</h4>
                <div>{locId}</div>
            </div>
            <div className="col-middle-box">
            { groupedSpecies.length ? 
                groupedSpecies.map(
                    fgroups => { 
                        return fgroups.map(
                            (n,i) => 
                            <>
                            <div id={n.groupOrder}>
                                {n.groupName}
                            </div>
                            <ul class="image-gallery">
                                {n.speciesList.map( 
                                    (species,k) =>
                                    <BirdPhoto speciesName={species.comName}/>
                                )}
                            </ul>
                            </>
                        )
                    }
                    )
                    :  
                    <div>
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