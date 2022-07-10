import "./style.css";
import PagPopularSerie from "../paginas-movie/serie";
import PagPopularFilme from "../paginas-movie/filme";
import MoviePrincipal from "./componentes/movie-principal";
import { useEffect, useState } from "react";



export default function Home() {
    const [categoriaMovie, setCategoriaMovie] = useState('popular')

    document.title = 'DFLIX'
    setTimeout(()=>{
        document.getElementById('container-home').style.display = 'block'
    }, 500)

    return (
        <div className="container-home" id="container-home">
            <MoviePrincipal/>
            <PagPopularSerie categoriaMovie={categoriaMovie} setCategoriaMovie={setCategoriaMovie}/>
            <PagPopularFilme categoriaMovie={categoriaMovie} setCategoriaMovie={setCategoriaMovie}/>
        </div>
    )
}