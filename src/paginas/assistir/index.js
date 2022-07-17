import { useState, useEffect, React } from "react";
import { useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import Sugestao from "../paginas-movie/sugestoes";
import Comentarios from "../assistir/componentes/comentarios";
import VideosFilmeSerie from "./componentes/trailers-filme-serie";
import Atores from "./componentes/atores";
import Compartilhar from "./componentes/compartilhar";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './style.css';

export default function Assistir() {
    const { filmeSerie, id } = useParams();
    const [ movie, setMovie ] = useState({});
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [ definirFilmeSerie, setDefinirFilmeSerie ] = useState();
    const [ idImdb, setIdImdb ] = useState();

    setTimeout(()=> {
        if (filmeSerie == 'movie') {
            setDefinirFilmeSerie('filme');
        } else if (filmeSerie == 'tv') {
            setDefinirFilmeSerie('serie');
        }

    }, 1);

    // filme ou série
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${filmeSerie}/${id}?api_key=${APIKey}&language=pt-BR`)
        .then(Response => Response.json())
        .then(data => {

            setMovie(data);
            
            setTimeout(()=>{
                if (data.title) {
                    document.title = `Assistir ${data.title} | DFLIX`;
                } else if (data.name) {
                    document.title = `Assistir ${data.name} | DFLIX`;
                }
            }, 100);
            });
    }, [id]);

    // id imdb filme e série

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${filmeSerie}/${id}/external_ids?api_key=${APIKey}&language=pt-BR`)
        .then(Response => Response.json())
        .then(data => {
            setIdImdb(data.imdb_id);
            });
    }, []);

    
    const converter = (minutos) => {
        const horas = Math.floor(minutos/ 60);
        const min = minutos % 60;
        const textoHoras = (`${horas}`);
        const textoMinutos = (`${min}`);

        if (minutos <= 59) {
            return `${textoMinutos}min`;
        } else {
            return `${textoHoras }h, ${textoMinutos}min`;
        }
        
    };
    
    function pesquisarGenero(genero, idGenero) {
        window.location.href = `/#/${filmeSerie}/genero=${idGenero}/${genero}&infantil=false&pagina=1`;
    }

    function redirecionarErro() {
        window.location = '/404'
    }

    return(
        <>
            {movie.id &&
                <div className="container-assistir" id="container-assistir">
                    <div className="all-content-assistir">
                        <div className="content-movie-assistir" style={{backgroundImage: `url(${image_path}${movie.backdrop_path})`}}>
                            <div className="movie-assistir">
                                <div className="div-imagem-movie-assistir">
                                    <img loading="lazy" src={`${image_path}${movie.poster_path}`} id='img-movie-assistir' alt={movie.name}/>
                                </div>
                                <div className="detalhes-movie-assistir">
                                    <span className="span-assistir-filmes-series">assistir {definirFilmeSerie} online na dflix</span>
                                    <h1 className="titulo-movie-assistir">{movie.title}{movie.name}</h1>
                                    <Atores id={id} filmeSerie={filmeSerie}/>
                                    <div className="informacoes-movie-assistir">
                                        <section>
                                            {movie.first_air_date &&
                                                <span>{movie.first_air_date.slice(0,4)}</span>
                                            }
                                            {movie.release_date &&
                                                <span>{movie.release_date.slice(0,4)}</span>
                                            }
                                        </section>
                                        {movie.status == 'Ended' &&
                                            <section className="section-serie-finalizada">
                                                <span>finalizada</span>
                                            </section>
                                        }
                                        {movie.vote_average != 0 &&
                                            <section>
                                                <span><i className="fas fa-star"></i> {(movie.vote_average).toFixed(1)}</span>
                                            </section>
                                        }
                                        {movie.runtime &&
                                            <section className="lancamento-movie-assitir">
                                                <span className="duracao-movie-assistir">{converter(movie.runtime)}</span>
                                            </section>
                                        }
                                        {movie.episode_run_time && movie.episode_run_time.length == 1 && 
                                            <section className="lancamento-movie-assitir">
                                                <span className="duracao-movie-assistir"><i className="fas fa-play"></i> {converter(movie.episode_run_time)} (ep.)</span>
                                            </section>
                                        }
                                        {movie.number_of_seasons &&
                                            <section className="section-temporadas">
                                                <span>{movie.number_of_seasons}T. </span> | 
                                                <span>{movie.number_of_episodes} EP's.</span>
                                            </section>
                                        }
                                    </div>
                                    <span className="descricao-movie-assistir">{movie.overview}</span>
                                    <div className="generos-movie-assistir">
                                        {movie.genres &&
                                            movie.genres.map((genero)=>{
                                                return(
                                                    <Tippy content={`Ver ${definirFilmeSerie}s de ${genero.name}`}>
                                                        <span onClick={()=>pesquisarGenero(genero.name, genero.id)}>{genero.name}</span>
                                                    </Tippy>
                                                )
                                            })
                                        }
                                    </div>
                                    <Compartilhar />
                                </div>
                            </div>
                        </div>

                        <div className="div-iframe-movie-assistir" id="iframe-assistir">
                            <iframe src={`https://embed.warezcdn.net/${definirFilmeSerie}/${idImdb}`} allowfullscreen="allowfullscreen" scrolling="no" allowtransparency height="500px" frameBorder="0"></iframe>
                        </div>
                        <VideosFilmeSerie id={id} filmeSerie={filmeSerie} definirFilmeSerie={definirFilmeSerie}/>                    
                        <Comentarios id={id} filmeSerie={filmeSerie} definirFilmeSerie={definirFilmeSerie}/>
                        <Sugestao idmovie={id}/>
                    </div>
                </div>
            }
            {movie.success == false &&
                redirecionarErro()
            }
        </>
    )
}