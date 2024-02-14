import { useSelector } from "react-redux"

const SideBar = () => {

    const {
        filteredSpeciesGrouping
    } = useSelector( (state) => state.speciesGrouping)

  return (
    <div id="mySidebar" className="sidebar">

    { filteredSpeciesGrouping.length ? 
        filteredSpeciesGrouping.map(
            sublist => { 
                return sublist.map(
                    (n,i) => 
                    <a key={i} href={"#"+n.groupOrder}>
                        {n.groupName}
                    </a>
                )
            }
        )
        :  <></>
    }

</div>

  )
}
export default SideBar