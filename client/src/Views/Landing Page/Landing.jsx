//Importamos el estilo 
import s from "../Landing Page/Landing.module.css"
//importamos la imagen
import image from "../../images/260608.jpg"
//import link
import { Link } from "react-router-dom"
export default function Landing() {
    return (
        <div className={s.landing}>
            <div className={s.column1}>
                <h1>PI Countries</h1>
                <p>Este es un proyecto individula creado por {<a href="https://github.com/LucasGaiton">LucasGaiton</a>}</p>

            </div>
            <div className={s.column2}>
                <Link to="/home">
                    <button className={s.button}>Home</button>
                </Link>
                <img className={s.image} src={image} />

            </div>
        </div>
    )
}