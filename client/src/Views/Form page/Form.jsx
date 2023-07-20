//import Estilo
import axios from "axios"
import s from "../Form page/Form.module.css"
//importamos los hooks 
import { useState, useEffect } from "react"
//importamos el estodo global 
import { useDispatch, useSelector, } from "react-redux"
//importamos actions
import { loadHome } from "../../Redux/actions"
export default function Form() {
    //Estados locales
    //data
    const [data, setData] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: []
    })
    //Errores
    const [errors, setErrors] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season: "",
        countries: ""
    })
    //botones
    const [isPressed, setIsPressed] = useState({
        spring:false,
        autumn:false,
        summer:false,
        winter:false
    });
    //Estados globales
    const allCountries = useSelector((store) => store.allCountries).sort((a, b) => {
        if (a.name < b.name) {
            return -1;
        }
        if (a.name > b.name) {
            return 1;
        }
        return 0;
    });
    const dispatch = useDispatch()

    //UseEffect
    useEffect(()=>{
        setErrors(validate(data))
    },[])

    //handlers y funciones
    const validate = (data) => {
        const regexName = /^[a-zA-Z\s]+$/;
        let errors = {
            name: "",
            difficulty: "",
            duration: "",
            season: "",
            countries: ""
        };

        if (!data.name) errors.name = "Name activity required";
        if (data.name.length > 20) errors.name = "Name too long";
        if (!regexName.test(data.name)) errors.name = "You can only use letters";

        if (data.difficulty === "") errors.difficulty = "Choose difficulty";
        if (data.duration === "") errors.duration = "Choose duration";
        if (data.season === "") errors.season = "Choose a season";

        if (!data.countries.length) errors.countries = "You must select at least one country"

        return errors;
    };
    const handlerChangeInputs = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
        setErrors(validate({ ...data, [e.target.name]: e.target.value }))

    }
    const handlerChangeButtons = (season, e) => {
        e.preventDefault()
        setSeason(season)
        setData({ ...data, season: season })
        setErrors(validate({ ...data, season: season }))


    }
    const handlerChangeCountry = (e) => {
        if (!data.countries.includes(e.target.value)) {
            setData({ ...data, [e.target.name]: [...data.countries, e.target.value] })
            setErrors(validate({ ...data, [e.target.name]: [...data.countries, e.target.value] }))
        }

    }
    const handlerSubmit = async (e) => {
        e.preventDefault()
        if (errors.name || errors.difficulty || errors.duration || errors.season || errors.countries)
            return alert("Error check the spaces in the form")
        const response = await axios.post("http://localhost:3001/activities", data)
        return alert("the activity was added successfully")
    }
    const removeCountry = (country) => {
        setData({ ...data, countries: data.countries.filter((country1) => country1 != country) })

    }
    const setSeason = (season) => {
        if(isPressed[season] === false)
            setIsPressed({...isPressed, [season]:true})
        else
            setIsPressed({...isPressed, [season]:false})
    }
    return (
        <div className={s.form}>
            <div className={s.formConteiner}>
                <h1 className={s.title}>NEW ACTIVIY</h1>
                <form onSubmit={handlerSubmit} action="">
                    <div className={s.section}>
                        <span className={s.name_section}>Name:</span> <br />
                        <input
                            className={s.input_text}
                            onChange={handlerChangeInputs}
                            name="name"
                            type="text"
                            placeholder="name"
                        />
                    </div>
                    {errors.name && <p className={s.error}>{errors.name}</p>}
                    <div className={s.section}>
                        <span className={s.name_section}>Dificulty:</span> <br />
                        <input
                            className={s.input_range}
                            onChange={handlerChangeInputs}
                            type="range"
                            name="difficulty"
                            min="1"
                            max="5"
                        />
                    </div >
                    {errors.difficulty && <p className={s.error}>{errors.difficulty}</p>}
                    <div className={s.section}>
                        <span className={s.name_section}>Duration(in hours):</span> <br />
                        <input
                            className={s.input_number}
                            onChange={handlerChangeInputs}
                            type="number"
                            name="duration"
                            min="1"
                            max="8"
                        />
                    </div>
                    {errors.duration && <p className={s.error}>{errors.duration}</p>}
                    <span className={s.name_section}>Season:</span> <br />
                    <div className={s.section_seasons}>
                        <div className={s.conteiner_season}>
                            <button onClick={(e) => handlerChangeButtons("spring", e)} className={isPressed.spring == true ? s.round_presed : s.round}></button><p>spring</p>
                        </div>
                        <div className={s.conteiner_season}>
                            <button onClick={(e) => handlerChangeButtons("autumn", e)} className={isPressed.autumn == true ? s.round_presed : s.round}></button><p>autumn</p>
                        </div>
                        <div className={s.conteiner_season}>
                            <button onClick={(e) => handlerChangeButtons("summer", e)} className={isPressed.summer == true ? s.round_presed : s.round}></button><p>summer</p>
                        </div>
                        <div className={s.conteiner_season}>
                            <button onClick={(e) => handlerChangeButtons("winter", e)} className={isPressed.winter == true ? s.round_presed : s.round}></button><p>Winter</p>
                        </div>
                    </div>
                    {errors.season && <p className={s.error}>{errors.season}</p>}
                    <span className={s.name_section}>Countries:</span> <br />
                    <div className={s.section}>
                        <select
                            name="countries"
                            onChange={handlerChangeCountry}
                        >
                            <option hidden>Elija los paises en los cuales se puede realizar</option>
                            {allCountries?.map((country, index) => {
                                return (
                                    <option key={index} value={country.name}>{country.name}</option>
                                )
                            })}
                        </select>
                        <div className={s.conteiner_countries}>
                            {data.countries.map((country, index) => {
                                return (
                                    <div className={s.countrie_selected} key={index}>
                                        <p>{country}</p>
                                        <p className={s.remove_p} onClick={() => removeCountry(country)}>X</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    {errors.countries && <p className={s.error}>{errors.countries}</p>}
                    <button className={s.submit} type="submit" >Submit</button>

                </form>

            </div>
        </div>
    )
}