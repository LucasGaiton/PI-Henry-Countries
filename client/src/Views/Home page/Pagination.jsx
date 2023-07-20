//importamos el estilo 
import s from "../Home page/Home.module.css"
export default function Pagination({ onChange, totalPosts, paginaActual }) {
    let pageNumbers = [] //Esta va a ser el array donde cargemos lo que se va a ver en la lista de paginas  

    //hacemos el calculo para sacar cuantas paginas necesita segun la cantidad de paises que se tengan que renderizar 
    for (let i = 1; i <= Math.ceil(totalPosts / 10); i++) {
        pageNumbers.push(i)
    }
    return (
        <div className={s.pagination}>
            {pageNumbers.map((num, index) => {
                if(paginaActual == num){
                    return <button className={s.page_selected} key={index} onClick={() => { onChange(num) }}>{num}</button>
                }
                return <button className={s.page_unselected} key={index} onClick={() => { onChange(num) }}>{num}</button>
            })}
        </div>
    )
}