import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { APIKey } from "../../../../../config/key"

export default function GeneroFilme() {

    const { generoPesquisado, numeroPagina } = useParams()
    const [movies, setMovies] = useState()
    const image_path = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIKey}&language=pt-BR&page=${numeroPagina}&include_adult=true&query=${generoPesquisado}`)
            .then(Response => Response.json())
            .then(data => {
                console.log(data)
                setMovies(data)
                console.log(movies)
                })
    }, [])

    return (
        <>
            
        </>
    )
}