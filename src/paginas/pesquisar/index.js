import { APIKey } from "../../config/key";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './style.css';

export default function Pesquisar() {
    
    const { numeroPagina, movieName } = useParams();
    const [name, setName] = useState(movieName);
    const [paginasMovie, setPaginasMovies] = useState();
    const [movies, setMovies] = useState([]);
    const [filmePesquisado, setFilmePesquisado] = useState(movieName);
    const image_path = 'https://image.tmdb.org/t/p/w500';

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/search/multi?api_key=${APIKey}&language=pt-BR&page=${numeroPagina}&adult=false&query=${movieName}`)
            .then(Response => Response.json())
            .then(data => {
                setMovies(data.results);

                if (data.results.length != 0) {
                    document.getElementById('h2-resultados-encontrados').innerHTML = `Resultados Encontrados para: ''${filmePesquisado}''`
                } else if (data.results.length == 0) {
                    document.getElementById('h2-resultados-encontrados').innerHTML = `Nenhum Resultado Encontrado: ''${filmePesquisado}''`
                }

                setPaginasMovies(data.total_pages);
                document.getElementById('div-botoes-paginas-pesquisar').innerHTML = `<h3 class="h3-pagina-atual">Página atual: ${numeroPagina}</h3>`
                for (var i=1; i <= data.total_pages && i <= 10; i++) {
                    document.getElementById('div-botoes-paginas-pesquisar').innerHTML += `
                    <a class='bt-pagina-pesquisar' href='/#/pesquisar/search=${filmePesquisado}&pagina=${i}' onclick='setTimeout(()=> {window.scrollTo(0,0)}, 1)'>${i}</a>
                    `
                }
                })
                document.title = 'Pesqsuisar - DFLIX';
    }, [movieName, numeroPagina])

    document.addEventListener('keydown', function(e) {
        switch (e.keyCode) {
            case 13:
                document.getElementById("bt-pequisar-movie").click();
                break;
        }
    }, false);
    
                
    function definirFilmePesquisado(props) {
        setFilmePesquisado(props);
        setName(props);
    }
 
    const inputPesquisar = document.getElementById("input-pesquisar");

    function recarregarPagina() {
        if(inputPesquisar.value && inputPesquisar.value.length >= 3) {
            window.location.href = `/#/pesquisar/search=${filmePesquisado}&pagina=1`;
        } else if (inputPesquisar.value.length <= 3) {
            alert('digite um valor maior que 3');
        } else {
            alert('digite um valor');
        }
    };

    setTimeout(() => {

        if (movieName != '') {
            document.getElementById('div-movie-pesquisar').style.display = 'flex';
            document.getElementById('div-pessoa-pesquisar').style.display = 'flex';
        }
    }, 1);

    return (
        <div className="componente-pequisar" id="componente-pequisar">
            <header className="header-componente-pesquisar">
                <section className="section-input-pesquisar">
                    <input autoFocus type='text' id="input-pesquisar" focus value={name} placeholder='Pesquise por filmes e séries' onChange={(e)=>definirFilmePesquisado(e.target.value)}/>
                    <a onClick={()=>recarregarPagina()} id='bt-pequisar-movie'><i className="fas fa-search"></i></a>
                </section>
                {numeroPagina &&
                    <h2 id="h2-resultados-encontrados"></h2>
                }
            </header>
            {numeroPagina && movieName != '' &&
                <>
                    <div className="div-movie-pesquisar" id="div-movie-pesquisar">
                        {movies.map(movie => {
                            return (
                                <>
                                    {((movie.release_date || movie.first_air_date) && movie.poster_path) &&
                                        <div className='movie-pesquisar' title={movie.title? movie.title : movie.name}>
                                            <Link to={`/assistir=${movie.media_type}&${movie.id}`}>
                                                <img loading="lazy" src={`${image_path}${movie.poster_path}`} alt={movie.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://st.depositphotos.com/1552219/1336/i/950/depositphotos_13364366-stock-photo-a-wrong-symbol.jpg";}}/>
                                                <section className="section-informacoes-movie-pesquisar">
                                                    <span><i class="fas fa-star"></i>{movie.vote_average.toFixed(1)}</span>
                                                    {movie.first_air_date &&
                                                        <span>{movie.first_air_date.slice(0,4)}</span>
                                                    }
                                                    {movie.release_date &&
                                                        <span>{movie.release_date.slice(0,4)}</span>
                                                    }
                                                </section>
                                            </Link>
                                            {
                                            movie.media_type == 'movie' &&
                                                <span className='span-movie-filme'>Filme</span>
                                            }
                                            {
                                            movie.media_type == 'tv' &&
                                                <span className='span-movie-serie'>Série</span>
                                            }
                                            <span className="titulo-movie">{movie.title}{movie.name}</span>
                                        </div>
                                    }
                                </>
                                )
                            })
                        }
                    </div>
                    <div className="div-pessoa-pesquisar" id="div-pessoa-pesquisar">
                        {movies.map(movie => {
                            return (
                                <>
                                {movie.profile_path &&
                                    <div className='pessoa-pesquisar'>
                                        <Link to={`/pessoa=${movie.id}`}>
                                            <img src={`${image_path}${movie.profile_path}`} alt={movie.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://st.depositphotos.com/1552219/1336/i/950/depositphotos_13364366-stock-photo-a-wrong-symbol.jpg";}}/>
                                            <section className="section-informacoes-pessoa-pesquisar">
                                                <span className="titulo-pessoa">{movie.name}</span>
                                            </section>
                                        </Link>
                                        <span className='span-pessoa'>Pessoa</span>
                                    </div>
                                }
                                </>
                                )
                            })
                        }
                    </div>
                </>
            }
            {!numeroPagina || numeroPagina <= 0 &&
                <div className="div-movie-pesquisar">
                    <span></span>
                </div>
            }
            {numeroPagina && movies.length != 0 && paginasMovie >= 2 &&
                <div id="div-botoes-paginas-pesquisar" className="div-botoes-paginas-pesquisar"></div>
            }
        </div>
    )
}