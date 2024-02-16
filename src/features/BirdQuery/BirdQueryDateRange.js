import DatePicker  from 'react-datepicker'
import {useState} from "react"
import { upDateMasterHistoricList,
        normalizeHistoricList,
        setSpeciesDescriptions,
        } from './birdQuerySlice'
import "react-datepicker/dist/react-datepicker.css"
import { useSelector, useDispatch } from 'react-redux'
import BirdPhoto from './BirdPhoto/BirdPhoto'
import moment from 'moment'
import axios from 'axios'
import config from "../../config"

const BirdQuery = () => {
    const dispatch = useDispatch()
    const {
        masterHistoricList,
        normalizedHistoricList    
    } = useSelector( (state) => state.birdQuery)

    const {
        locId,
    } = useSelector( (state) => state.location)

    const {
        filteredSpeciesGrouping
    } = useSelector( (state) => state.speciesGrouping)

    const [startDate, setStartDate] = useState( new Date())
    const [endDate, setEndDate] = useState( new Date())

    let requestConfig = config.axiosConfig

    const processDateRangeRequests = (beginDate, stopDate, yearRange) => {
        var yearOffset = 1
        var dateArray = []
        var currentDate = new Date(beginDate.toString())
        var currentStopDate = new Date(stopDate.toString())

        while ( yearOffset <= yearRange ) {
            currentDate.setDate(beginDate.getDate())
            currentDate.setFullYear( beginDate.getFullYear() - yearOffset )
            currentStopDate.setDate(stopDate.getDate())
            currentStopDate.setFullYear( stopDate.getFullYear() - yearOffset )
  
            while ( currentDate < currentStopDate ) {
                currentDate.setDate(currentDate.getDate()+1)                
                dateArray.push(moment(currentDate).format('YYYY/MM/DD'))
            }
            currentDate = new Date(beginDate.toString())
            yearOffset+=1
        }

            const urls=dateArray.map((day) => `https://api.ebird.org/v2/data/obs/${locId}/historic/${day}`)
  
            axios.all(urls.map(
                (endpoint) => {
                        requestConfig.url = endpoint
                        axios(requestConfig)
                            .then(res => res.data)
                            .then( data => {
                                dispatch(upDateMasterHistoricList(data))
                                // dispatch(setQueryDate(data[0].obsDate))
                                })
                            .catch(function (error) {
                            console.log(error)
                            })
                        return null
                    }
                )
            )
    }

    const dedupeMasterList = () => {
        
       var allSpeciesOccurrences = masterHistoricList.map(
            m => {
                var sc = m.map(
                    species => { 
                       const {speciesCode, comName, sciName, taxonOrder, comNameCodes} = species
                       return {
                        speciesCode: speciesCode, 
                        comName: comName, 
                        sciName: sciName, 
                        taxonOrder: taxonOrder, 
                        comNameCodes: comNameCodes
                       }
                    }
                )
                return sc
            }
        )
        const uniqSpecies = uniqByKeepLast(allSpeciesOccurrences, n => n.speciesCode )
        dispatch(normalizeHistoricList(uniqSpecies))
    }

    //a nice utility function
    const uniqByKeepLast = (data, key) => {
        return [
            ...new Map(
                data.map( x => [key(x), x])
            ).values()
        ]
    }

    const processSpeciesTaxonomy = (speciesList) => {
        if (speciesList.normalizedHistoricList[0] === undefined) {
            return(null)
        } else {
            console.log("processSpeciesTaxonomy")
            let nhl = speciesList.normalizedHistoricList[0]
            console.log(nhl)
            var nhlUpdated = []
            nhl.forEach(
                // (e,index) => {    
                //     e.forEach(
                       (species, i) => {
                        console.log("loop2")
                                const taxonConfig = config
                                taxonConfig.url = `https://api.ebird.org/v2/ref/taxonomy/ebird?species=${species.speciesCode}&fmt=json`
                                axios(taxonConfig).then( (res) => {
                                dispatch(setSpeciesDescriptions(res.data[0]))
                            }).catch( (err) => {
                                console.log(err.message)
                            })
                        }
                    // )
                // }
            )
            dispatch(normalizeHistoricList(nhlUpdated))
        }
    }

    const queryButton = {masterHistoricList}.length || 
        <button onClick={ 
            () => processDateRangeRequests({startDate}.startDate,{endDate}.endDate, 15)}>
                Run Query
        </button>
    const dedupButton = {masterHistoricList}.length || 
    <button onClick={() => dedupeMasterList()}>
            Run dedup
    </button>

    const speciesTaxonomuButton = {normalizedHistoricList}.length || 
        <button onClick={ 
            () => processSpeciesTaxonomy({normalizedHistoricList})}>
                Populate Taxon Info</button>

  return (
    <>
    <div className="col col-30">
        <h4>Location</h4>
        <div>{locId}</div>
    </div>
    <div className="col col-30">
        <h4>Start date</h4>
        <DatePicker selected={startDate} onChange={(date) =>{ setStartDate(date) }}/>
    </div>
    <div className="col col-30">
        <h4>End date</h4>
        <DatePicker selected={endDate} onChange={(date) =>{ setEndDate(date) }}/>
    </div>

    { filteredSpeciesGrouping.length ? 
            filteredSpeciesGrouping.map(
                fgroups => { 
                    return fgroups.map(
                        (n,i) => 
                        <>
                        <div className="col-middle-box" key={i} id={n.groupOrder}>
                           {n.groupName}-{n.speciesList.length}
                        </div>
                        {n.speciesList.map( 
                            (species,k) => 
                            <div className="col-middle-box" key={`${n.groupOrder}-${k}`}>
                                {k}-{species.comName}
                                <BirdPhoto 
                                // speciesCode=
                                speciesName={species.comName}
                                />
                            </div>
                        )}
                        </>
                    )
                }
            )
            :  
            <div className="col-middle-box">
            {queryButton}
            {dedupButton}
            {speciesTaxonomuButton}
         </div> 
        }

    </>
  )
}

export default BirdQuery