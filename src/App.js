import './App.css'
import BirdQuery from './features/BirdQuery/BirdQuery'
import SideBar from './components/SideBar'
import SpeciesGroupingMenu from './features/SpeciesGrouping/SpeciesGroupingMenu'
// import Location from './features/Location/Location'

function App() {
  return (
    <>
    <div className="wrapper">
      <SpeciesGroupingMenu />
      <SideBar />
      <div className="columns">
        <BirdQuery />
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
