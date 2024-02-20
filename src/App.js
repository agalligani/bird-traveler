import './App.css'
import { updateSpeciesGrouping, } from "./features/SpeciesGrouping/speciesGroupingSlice" 
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from "./config"
import { useEffect } from "react"
import BirdQueryFullRegional from './features/BirdQuery/BirdQueryFullRegional'
import NavPills from './components/NavPills'
import Location from './features/Location/Location'

function App() {
  const dispatch = useDispatch()
  const loadSpeciesGroupings = () => {
      let axiosConfig = config
      axiosConfig.url = `https://api.ebird.org/v2/ref/sppgroup/merlin\n`
      axios(axiosConfig)
          .then(res => res.data.length ? 
              dispatch(updateSpeciesGrouping(res.data)) 
              : "" )
          .catch( err => err.message)
  }

  useEffect(() => loadSpeciesGroupings() ,[])
  return (
    <>
    <Location />
    <button onClick={() => window.scrollTo({ top: 10, behavior: "smooth" })} id="topBtn" title="Go to top">Top</button>
    <div className="wrapper">
      <NavPills />
      {/* <SpeciesGroupingMenu /> */}
      <div className="columns">
        <BirdQueryFullRegional />
        <footer className="col col-100 centered">
          <h5>Copyright 2014 - All rights reserved</h5>
          <div>Background photo by cetteup on Unsplash</div>
        </footer>
      </div>
    </div>
    </>
  )
}

export default App;
