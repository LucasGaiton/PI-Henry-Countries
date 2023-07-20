//importamos el estilo 
import s from "../Detail page/Detail.module.css"
//importamos las actions 
import { loadDetail } from "../../Redux/actions";
//importamos hooks 
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react";

export default function Detail() {
    const { id } = useParams();
    //declaramos el estado global 
    const countryDetail = useSelector((store) => store.countryDetail)
    const dispatch = useDispatch()
    //useEffect
    useEffect(() => {
        const aux = async () => { await dispatch(loadDetail(id)) }
        aux()
    }, [])

    return (
        <div className={s.detail}>
            <div className={s.row1}>
                <div className={s.colum1}>
                    <h1 className={s.data}>Id: {countryDetail.id}</h1>
                    <h1 className={s.data}> Subregión: {countryDetail.subregion}</h1>
                    <h1 className={s.data}>Population: {countryDetail.population}</h1>

                </div>
                <div className={s.colum2}>
                    <h1 className={s.name}>{countryDetail.name}</h1>
                    <div className={s.image_conteiner}>
                        <img className={s.image} src={countryDetail.image} />
                        <div className={s.overlay_img}></div>
                    </div>
                </div>
                <div className={s.colum3}>
                    <h1 className={s.data}>Continent: {countryDetail.continent}</h1>
                    <h1 className={s.data}>Área: {countryDetail.area}</h1>
                    <h1 className={s.data}>Capital: {countryDetail.capital}</h1>
                </div>
            </div>
            <h1 className={s.h1_activities}>tourist activities that can be done:</h1>
            <div className={s.row2}>
                {countryDetail.Activities?.map((activitie, index) => {
                    return (
                        <div key={index} className={s.Activities}>
                            <h2>{activitie.name}</h2>
                            <p >Difficulty: {activitie.difficulty}</p>
                            <p >Duration: {activitie.duration}.hs</p>
                            <p >Season: {activitie.season}</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}