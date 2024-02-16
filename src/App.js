import './App.css'
import SideBar from './components/SideBar'
import SpeciesGroupingMenu from './features/SpeciesGrouping/SpeciesGroupingMenu'
import BirdQueryFullRegional from './features/BirdQuery/BirdQueryFullRegional'
import NavPills from './components/NavPills'

function App() {
  return (
    <>
    <div className="wrapper">
      <NavPills />
      <SpeciesGroupingMenu />
      {/* <SideBar /> */}
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
