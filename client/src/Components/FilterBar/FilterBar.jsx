//importamos el estilo 
import s from "../FilterBar/FilterBar.module.css"
//importamos hooks
import { useState, useEffect } from "react"

//importamos hooks de redux
import { useSelector, useDispatch } from "react-redux"

//importamos actions 
import { loadAll, loadFilter, loadActivities } from "../../Redux/actions"

export default function FilterBar({ onChange }) {
    //Estados locales
    const [filterOp, setFilterOp] = useState({
        continent: null,
        activities: null,
        order: null
    })
    //Estados globales 
    const allCountries = useSelector((store) => store.allCountries)
    const activities = useSelector((store) => store.activities)
    const dispatch = useDispatch()

    //UseEffect
    useEffect(() => {
        dispatch(loadActivities())
    }, [])

    //handlers
    const handlerContinent = (e) => {

        setFilterOp({ ...filterOp, continent: e.target.value })

    }
    const handlerActivities = (e) => {

        setFilterOp({ ...filterOp, activities: e.target.value })


    }
    const handlerOrder = (e) => {

        setFilterOp({ ...filterOp, order: e.target.value })
    }
    const clearForm = async () => {
        setFilterOp({
            continent: null,
            activities: null,
            order: null
        })
        await dispatch(loadFilter([]))


    }
    const handlerFilter = async () => {
        const filtredCountries = allCountries.filter(({ Activities, continent }) => {
            //flags
            let Continent = filterOp.continent === "all" || filterOp.continent === null ? true : false
            let activities = filterOp.activities === null ? true : false

            //Filtramos por contiente
            if (!Continent) {
                if (continent === filterOp.continent) Continent = true
            }
            // filtramos por actividades
            if (!activities) {
                Activities.forEach((activity) => {
                    if (activity.name) {
                        if (activity.name === filterOp.activities) activities = true
                    }
                })


            }

            return Continent && activities
        })

        ///Ordenamiento
        if (filtredCountries.length < 1) {
            return alert("No existen countries con esos datos")
        }

        if (filterOp.order === "A-Z") {
            filtredCountries.sort((a, b) => {
                if (a.name < b.name) {
                    return -1;
                }
            })
        }
        if (filterOp.order === "Z-A") {
            filtredCountries.sort((a, b) => {
                if (a.name > b.name) {
                    return -1;
                }
            })
        }
        if (filterOp.order === "UPWARD") {
            filtredCountries.sort((a, b) => {
                if (a.population < b.population) {
                    return -1;
                }
            })

        }
        if (filterOp.order === "FALLING") {
            filtredCountries.sort((a, b) => {
                if (a.population > b.population) {
                    return -1;
                }
            })
        }
        await dispatch(loadFilter(filtredCountries))
        onChange(1)

    }

    return (
        <div className={s.filterBar}>
            <div>
                <select className={s.desplegables} onChange={handlerContinent} name="Continent" id="">
                    <option value="" hidden>Continent</option>
                    <option value="all">all</option>
                    <option value="North America">North America</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                    <option value="Asia">Asia</option>
                    <option value="Africa">Africa</option>
                    <option value="South America">South America</option>

                </select>

            </div>
            <div>
                <select className={s.desplegables} onChange={handlerActivities} name="" id="">
                    <option value="" hidden>Activities</option>
                    {activities.map((activity, index) => {
                        return (
                            <option key={index} value={activity.name}>{activity.name}</option>
                        )
                    })}
                </select>

            </div>
            <div>
                <select className={s.desplegables} onChange={handlerOrder} name="" id="">
                    <option value="" hidden>Order</option>
                    <option value="A-Z">alphabetical A-Z</option>
                    <option value="Z-A">alphabetical Z-A</option>
                    <option value="UPWARD">population UPWARD</option>
                    <option value="FALLING">population FALLING</option>

                </select>

            </div>
            <div>
                <button className={s.botones} onClick={handlerFilter}>Filtrar</button>
            </div>
            <div>
                <button className={s.botones} onClick={clearForm}>Reset</button>
            </div>
        </div>
    )
}