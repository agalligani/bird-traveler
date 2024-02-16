import './App.css'
import SpeciesGroupingMenu from './features/SpeciesGrouping/SpeciesGroupingMenu'
import BirdQueryFullRegional from './features/BirdQuery/BirdQueryFullRegional'
import NavPills from './components/NavPills'

function App() {
  return (
    <>
    
    <button onClick={() => window.scrollTo({ top: 10, behavior: "smooth" })} id="topBtn" title="Go to top">Top</button>
    <div className="wrapper">
      <NavPills />
      <SpeciesGroupingMenu />
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
