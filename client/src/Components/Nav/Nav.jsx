//importmaos el estilo
import s from "../Nav/Nav.module.css"
//importamos el logo
import logo from "../../images/Screenshot_4.jpg"
//importamos componenetes 
import SearchBar from "../SearchBar/SearchBar"
//importamos link
import { Link } from "react-router-dom"
export default function Nav() {
    return (
        <div className={s.nav}>
            <div className={s.logo}>
                <Link to={"/home"}>
                    <img className={s.logo_image} src={logo} />
                </Link>
            </div>
            <div className={s.column2}>
                <SearchBar />
            </div>
            <div className={s.column3}>
                <Link to={"/newActiviy"}>
                    <button className={s.andromeda}>Create Activity</button>
                </Link>

            </div>
        </div>
    )
}