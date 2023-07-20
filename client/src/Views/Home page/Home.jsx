//importmaos el estilo 
import s from "../Home page/Home.module.css"
//importamos las cosas de el redux 
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
//importamos las actions 
import { loadHome, loadAll } from "../../Redux/actions"
//importamos componentes
import Card from "../../Components/Card/Card"
import Pagination from "./Pagination"
import FilterBar from "../../Components/FilterBar/FilterBar"

export default function Home() {
    ///instanciamos el dispatch y el selector 
    const dispacth = useDispatch()
    const countriesHome = useSelector((store) => store.home)
    const filterCountries = useSelector((store) => store.filterCountries)

    //useffect
    useEffect(() => {
        if (!countriesHome.length) {
            dispacth(loadHome())
            dispacth(loadAll())
        }
    }, [])

    //estados locales 
    const [paginaActual, setPaginaActual] = useState(1)

    //Paginado
    const indexOfLastPost = paginaActual * 10
    const indexOfFirstPost = indexOfLastPost - 10

    let currentPage = []
    if (filterCountries.length >= 1) {
        //Este if es para que las paginas no se muestren vacias 
        // let aux = filterCountries.slice(indexOfFirstPost, indexOfLastPost)
        // if (aux.length < 1) {
        //     setPaginaActual(paginaActual - 1)
        // } else {
        //     currentPage = aux

        // }
        currentPage = filterCountries.slice(indexOfFirstPost, indexOfLastPost)
    }
    else {
        //Este if es para que las paginas no se muestren vacias 
        // let aux = countriesHome.slice(indexOfFirstPost, indexOfLastPost)
        // if (aux.length < 1) {
        //     setPaginaActual(paginaActual - 1)
        // } else {
        //     currentPage = aux

        // }
        currentPage = countriesHome.slice(indexOfFirstPost, indexOfLastPost)
    }

    //Funciones 
    const onChange = (num) => {
        setPaginaActual(num)

    }
    const nextPage = () => {
        let totalPosts = filterCountries.length >= 1 ? filterCountries.length : countriesHome.length
        let pageNumbers = []
        for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
            pageNumbers.push(i)
        }
        if (currentPage.length > 1) {
            if (paginaActual < pageNumbers.length) {
                setPaginaActual(paginaActual + 1)
            }
        }

    }
    const backPage = () => {
        if (paginaActual > 1) setPaginaActual(paginaActual - 1)
    }

    return (
        <div className={s.home}>
            <FilterBar onChange={onChange}></FilterBar>
            <div className={s.pagination_conteiner}>
                <button className={s.button_page} onClick={backPage}>←</button>
                <Pagination className={s.button_page} paginaActual={paginaActual} onChange={onChange} totalPosts={filterCountries.length >= 1 ? filterCountries.length : countriesHome.length} />
                <button className={s.button_page} onClick={nextPage}>→</button>
            </div>
            <div className={s.cards}>
                {currentPage.map((country, index) => <Card id={country.id} key={index} name={country.name} image={country.image} continent={country.continent} />)}
            </div>
            <div className={s.pagination_futter_conteiner}>
                <button className={s.button_page} onClick={backPage}>←</button>
                <Pagination paginaActual={paginaActual} onChange={onChange} totalPosts={filterCountries.length >= 1 ? filterCountries.length : countriesHome.length} />
                <button className={s.button_page} onClick={nextPage}>→</button>
            </div>
        </div>
    )

}
