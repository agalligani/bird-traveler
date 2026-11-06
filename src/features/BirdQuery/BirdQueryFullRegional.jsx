import {
    updateRegionalSpeciesList,
    setSpeciesDescriptions,
    updateGroupedSpecies
        } from './birdQuerySlice'
import { useState, useEffect } from 'react'

import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from 'react-redux'
import { ExtractBirdPhoto } from './BirdPhoto/BirdPhoto'
import axios from 'axios'
import config from "../../config"
import wikiConfig from "../../wikiConfig"
import {chunkArray} from '../../utils'
const wikiReqConfig = wikiConfig.axiosConfig
const requestConfig = config.axiosConfig
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

    /*** handle Ctrl-click action on Photo */
    const [newBirdPhoto, setNewBirdPhoto] = useState(null)

    const handleCtrlClick = (e) => {
        if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
    /*** might convert to a component to make this easier.... */
        const speciesCode = e.target.closest('.image-item').getElementsByClassName("speciescode")[0].textContent
        const speciesName = e.target.alt
        let editedSpeciesName = prompt("Please enter updated species name:", speciesName)
        wikiReqConfig.params.titles = editedSpeciesName
        axios(wikiReqConfig).then(
            res => {
                let data = res.data.query.pages
                data = Object.values(data).map(page => ({
                    title: page.title,
                    thumbnail: page.thumbnail ? page.thumbnail.source : null,
                    width: page.thumbnail ? page.thumbnail.width : null,
                    height: page.thumbnail ? page.thumbnail.height : null,
                    description: page.pageprops ? page.pageprops.description : null,
                }));
                return data[0]}
            ).then(

            data => {
                  let mutatedSpecies = [...groupedSpecies]
                  const extractedBird = mutatedSpecies[0].map(
                    n => n.speciesList.flatMap(
                        (species, index) => species.speciesCode === 'thbpig1' ? index : []
                    ))
                    .map(
                        (n, i) => n.length > 0 ? {groupIndex: i, speciesIndex: n[0]}:undefined
                    )
                    .filter((n) => n !== undefined)[0]

                    const photoUrl = 'https://en.wikipedia.org/wiki/Colinus#/media/File:Northern_Bobwhite_(34922290546).jpg'

                //    mutatedSpecies[0][extractedBird.groupIndex].speciesList[extractedBird.speciesIndex].photoUrl = photoUrl


                console.log(mutatedSpecies)
                //   dispatch(updateGroupedSpecies(mutatedSpecies))
            }
        )
            // localStorage.removeItem(`wiki-photo-${speciesCode}`)
            // localStorage.clear()
        }

     }
    let requestConfig = config.axiosConfig
    const speciesListForARegion = () => {
        const url = `https://api.ebird.org/v2/product/spplist/${locId}\n`
        requestConfig.url = url
        axios(requestConfig).then(
            //@todo add thunk function to handle this dispatch and automatically dispatch remaining
            // two functions
            res => dispatch(updateRegionalSpeciesList(res.data))
        ).catch((error) => {
            console.log(error.message)
            }
        )
    }

    /** Creates an array of species with their taxonomy number for sorting */
    const populateSpeciesDetails = (speciesList) => {
            let chunkedSpeciesList = chunkArray(speciesList.regionalSpeciesList, 30)
            chunkedSpeciesList.forEach(
                (chunk, i) => {
                    /** update species taxonomy */
                    requestConfig.url = `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${chunk.join(",")}&fmt=json`
                    axios(requestConfig).then( (res) => {
                        res.data.forEach(
                            (species, j) => {
                                const birdPhoto = ExtractBirdPhoto({speciesName: species.comName, speciesCode: species.speciesCode})
                                species.photoURL = birdPhoto.url
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
    /** @TODO check if this code is duplicated in ../speciesgroup */
    /** sorts species into taxonomy buckets */
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
            <div key={locName} id="locName" className="location_name">{locName}:</div>
            { groupedSpecies.length ? 
                groupedSpecies.map(
                    fgroups => { 
                        return fgroups.map(
                            (n,i) => 
                            <div key={i} >
                            <div key={"group-heading"+i} className="group-heading" id={n.groupOrder}>
                                {n.groupName}
                            </div>
                            <ul key={"image-gallery"+i} className="image-gallery">
                                {n.speciesList.map(
                                    (species,k) =>
                                        <>
                                    <div key={"image-link-"+i+"-"+k} className="image-link"
                                    onClick={(e) => {
                                        let birdUrl=`https://ebird.org/species/${species.speciesCode}\n`
                                        window.open(birdUrl, "_blank")
                                    }}
                                    onContextMenu={handleCtrlClick}
                                    href={`https://ebird.org/species/${species.speciesCode}\n`} target="_blank">
                                        <li className="image-item" key={species.speciesCode}>
                                            <div className="hidden speciescode">{species.speciesCode}</div> 
                                            <img alt={species.comName} value={species.comName} src={species.photoURL}/>
                                            <a className="overlay" href={`https://ebird.org/species/${species.speciesCode}\n`} ><span>{species.comName}</span></a>
                                        </li>
                                    </div>
                                    </>
                                )}
                            </ul>
                        </div>
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