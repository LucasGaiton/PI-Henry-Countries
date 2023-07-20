//importamos laas actions 
import { loadFilterByName } from "../../Redux/actions"
//importamos los hooks 
import { useState, useEffect } from "react"
//importamos el estilo 
import s from "../SearchBar/SearchBar.module.css"

//importamos hooks de redux
import { useDispatch, useSelector } from "react-redux"
export default function SearchBar() {
    //estados locales 
    const [search, setSearch] = useState("")

    //Estados globlaes
    const filterCountries = useSelector((store) => store.filterCountries)
    const dispatch = useDispatch()

    //handlers
    const handlerChange = (e) => {
        console.log(e.target.value);
        setSearch(e.target.value)
    }

    const handlerSearch = async() => {
        await dispatch(loadFilterByName(search))



    }
    return (
        <div className={s.searchBar}>
            <input
                onChange={(e)=> handlerChange(e)}
                type="text"
                placeholder="Busca un pais "
            />
            <button onClick={handlerSearch}>Buscar</button>
        </div>
    )
}