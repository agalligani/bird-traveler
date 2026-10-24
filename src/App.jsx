import './App.css'
import { updateSpeciesGrouping, } from "./features/SpeciesGrouping/speciesGroupingSlice" 
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import config from "./config"
import { useEffect } from "react"
import BirdQueryFullRegional from './features/BirdQuery/BirdQueryFullRegional'
import NavPills from './components/NavPills'
import Location from './features/Location/Location'
import Document from './features/Document/Document'
import Menu from './components/Menu'

function App() {
  const dispatch = useDispatch()
  const loadSpeciesGroupings = () => {
      let axiosConfig = config
      axiosConfig.url = `https://api.ebird.org/v2/ref/sppgroup/ebird\n`
      axios(axiosConfig)
          .then(res => res.data.length ? 
              dispatch(updateSpeciesGrouping(res.data)) 
              : "" )
          .catch( err => err.message)
  }

  useEffect(() => loadSpeciesGroupings() ,[])
  return (
    <>
    <Menu />
    <Location />
    <div className="wrapper">
      <NavPills />
    <div className="columns">
      <BirdQueryFullRegional />
      <Document />
    <footer className="col col-100 centered">
    </footer>
    </div>
   </div>
  </>
  )
}

export default App;
