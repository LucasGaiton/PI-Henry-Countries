//importamos link
import { Link } from 'react-router-dom';

//importamos el estilo 
import s from "../Card/Card.module.css"
export default function Card({ id, image, name, continent }) {
    return (
        <Link to={`/detail/${id}`}>
            <div className={s.card}>
                <div className={s.conteiner_img}>
                    <img src={image} />
                    <div className={s.overlay_img}></div>
                </div>
                <div>
                    <h1>{name}</h1>
                    <h2>{continent}</h2>
                </div>
            </div >
        </Link>


    )

}