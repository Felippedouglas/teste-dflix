import { Link, useParams } from "react-router-dom";
import './style.css';
import { useEffect, useState } from "react";
import { APIKey } from "../../../config/key";

export default function PesqusiarGenero() {

    const { generoPesquisado, idGenero, numeroPagina, filmeSerie, infantil } = useParams();
    const [ definirFilmeSerie, setDefinirFilmeSerie ] = useState();
    const [ generos, setGeneros ] = useState([]);
    const [movies, setMovies] = useState([]);
    const image_path = 'https://image.tmdb.org/t/p/w500';

    
/*
        <div className="div-paginas" id="div-paginas">
            <button className="bt-slide bt-left-div-paginas" id="bt-left-div-paginas" onClick={btPaginasLeftSlide}><i class="fas fa-angle-left"></i></button>
            <div id="div-bts-paginas-generos" className="div-bts-paginas-generos"></div>
            <button className="bt-slide bt-right-div-paginas" id="bt-right-div-paginas" onClick={btPaginasRightSlide}><i class="fas fa-angle-right"></i></button>
        </div>
*/

    document.title = `${definirFilmeSerie} de ${generoPesquisado} - DFLIX`;

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/discover/${filmeSerie}?api_key=${APIKey}&language=pt-BR&sort_by=popularity.desc&with_genres=${idGenero}&page=${numeroPagina}`)
            .then(Response => Response.json())
            .then(data => {
                setMovies(data.results)
                console.log(data.total_pages)
            })
    }, [numeroPagina, generoPesquisado, filmeSerie, infantil])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/genre/${filmeSerie}/list?api_key=${APIKey}&language=pt-BR`)
            .then(Response => Response.json())
            .then(data => {
                setGeneros(data.genres)
            })
    }, [filmeSerie])

    setTimeout(()=> {
        if (filmeSerie == 'movie') {
            setDefinirFilmeSerie('Filmes');
        } else if (filmeSerie == 'tv') {
            setDefinirFilmeSerie('Séries');
        }

        document.getElementById(`label=${idGenero}`).click()
        document.getElementById(`label-pagina=${numeroPagina}`).click()
    }, 1);

    var divSlider = document.getElementById("div-generos")
    var btLeft = document.getElementById("bt-left-div-generos")

    function btGeneroLeftSlide() {
        divSlider.scrollLeft -= 200;
        if (divSlider.scrollLeft < 10) {
            btLeft.style.display = "none";
        }
    }
    
    function btGeneroRightSlide() {
        divSlider.scrollLeft += 200;
        btLeft.style.display = "block";
        btLeft.style.left = "-20px";
        btLeft.style.padding = "0 40px 0 20px";
    }

    var divPaginas = document.getElementById("div-paginas")
    var btLeftPaginas = document.getElementById("bt-left-div-paginas")

    function btPaginasLeftSlide() {
        divPaginas.scrollLeft -= 400;
        if (divPaginas.scrollLeft < 10) {
            btLeftPaginas.style.display = "none";
        }
    }
    
    function btPaginasRightSlide() {
        divPaginas.scrollLeft += 400;
        btLeftPaginas.style.display = "block";
        btLeftPaginas.style.left = "-20px";
        btLeftPaginas.style.padding = "0 40px 0 20px";
    }

    function mudarPagina(e) {
        window.location.href = `/#/${filmeSerie}/genero=${idGenero}/${generoPesquisado}&infantil=${infantil}&pagina=${e}`;
        alert('mudou a página')
    }
    
    return(
        <div className="div-genero-pesquisado">
        <header className="header-componente-pesquisar">
            {numeroPagina &&
                <>
                    {idGenero &&
                        <h2 className="h2-titulo-generos" id="h2-filmes-com-genero-encontrados">{definirFilmeSerie} {idGenero == 10762 || idGenero == 53 || idGenero == 10751 ? '' : 'de' } {generoPesquisado}</h2>
                    }
                </>
            }
        </header>
        {infantil == 'false'  &&
            <div className="div-generos" id="div-generos">
                <button className="bt-slide bt-left-div-generos" id="bt-left-div-generos" onClick={btGeneroLeftSlide}><i class="fas fa-angle-left"></i></button>
                {generos.map(genero => {
                    return (
                        <section>
                            <input className="input-escolher-genero" type='radio' name='input-radio-genero' id={`input-genero=${genero.id}`}/>
                            <label className="label-escolher-genero" id={`label=${genero.id}`} htmlFor={`input-genero=${genero.id}`}>
                                <span onClick={()=>{window.location.href = `/#/${filmeSerie}/genero=${genero.id}/${genero.name}&infantil=false&pagina=1`}}>{genero.name}</span>
                            </label>
                        </section>
                    )
                    })
                }
                <button className="bt-slide bt-right-div-generos" id="bt-right-div-generos" onClick={btGeneroRightSlide}><i class="fas fa-angle-right"></i></button>
            </div>
        }
        {filmeSerie =='movie' &&
            <>
                <div className="div-movie-pesquisar-genero">
                    {movies.map(movie => {
                        return (
                            <>
                                <div className='movie-pesquisar' title={movie.title}>
                                    <Link to={`/assistir=${filmeSerie}&${movie.id}`}>
                                        <img loading="lazy" src={`${image_path}${movie.poster_path}`} alt={movie.title} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://st.depositphotos.com/1552219/1336/i/950/depositphotos_13364366-stock-photo-a-wrong-symbol.jpg";}}/>
                                        <section className="section-informacoes-movie-pesquisar">
                                            <span><i class="fas fa-star"></i>{movie.vote_average.toFixed(1)}</span>
                                        </section>
                                    </Link>
                                    <span className="titulo-movie">{movie.title}</span>
                                </div>
                            </>
                            )
                        })
                    }
                </div>
            </>
        }
        {filmeSerie =='tv' &&
            <>
                <div className="div-movie-pesquisar-genero">
                    {movies.map(movie => {
                        return (
                            <>
                                <div className='movie-pesquisar' title={movie.name}>
                                    <Link to={`/assistir=${filmeSerie}&${movie.id}`}>
                                        <img loading="lazy" src={`${image_path}${movie.poster_path}`} alt={movie.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://st.depositphotos.com/1552219/1336/i/950/depositphotos_13364366-stock-photo-a-wrong-symbol.jpg";}}/>
                                        <section className="section-informacoes-movie-pesquisar">
                                            <span><i class="fas fa-star"></i>{movie.vote_average.toFixed(1)}</span>
                                        </section>
                                    </Link>
                                    <span className="titulo-movie">{movie.name}</span>
                                </div>
                            </>
                            )
                        })
                    }
                </div>
            </>
        }
        </div>
    )
}