import { useSelector } from "react-redux"

const NavPills = () => {


    const {
        groupedSpecies
    } = useSelector( (state) => state.birdQuery)

    return (
    <ul className="nav nav-pills">
    { groupedSpecies.length ? 
        groupedSpecies.map(
            sublist => { 
                return sublist.map(
                    (n,i) => 
                    <li className="nav-item">
                    <a className="nav-link" key={i} href={"#"+n.groupOrder}>
                        {n.groupName}
                    </a>
                    </li>
                )
            }
        )
        :  <></>
    }
</ul>  
)
}
export default NavPills

