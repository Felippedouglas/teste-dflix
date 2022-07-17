import { APIKey } from "../../../config/key";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import './sugestoes.css';

export default function Sugestao(props) {
    
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [movies, setMovies] = useState([]);
    const { filmeSerie } = useParams();

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${filmeSerie}/${props.idmovie}/recommendations?api_key=${APIKey}&language=pt-BR&page=1`)
            .then(Response => Response.json())
            .then(data => {
                setMovies(data.results);
            })

    }, [])

    var divSlider = document.getElementById("movie-list-sugestoes");
    var btLeft = document.getElementById("bt-left-slide-sugestoes");
    function btLeftSlideSugestoes() {
        divSlider.scrollLeft -= 380;
        if (divSlider.scrollLeft < 10) {
            btLeft.style.display = "none";
        }
    }
    
    function btRightSlideSugestoes() {
        divSlider.scrollLeft += 380;
        btLeft.style.display = "block";
        btLeft.style.left = "-20px";
        btLeft.style.padding = "0 40px 0 20px";
    }

    function recarregar() {
        setTimeout(()=>{
            window.location.reload();
        }, 100)
    }

    setTimeout(()=>{
        if (movies.total_results == 0) {
            document.getElementById("movie-list-sugestoes").innerHTML = 'Não há sugestões!';
        }
    }, 100)

    return(
        <div className="content-movies content-sugestoes" id="content-sugestoes">
            <h2 className="h2-sugestoes h2-titulo-sections">SUGESTÕES</h2>
            <div className="div-movies div-filmes-sugestões" id="movie-list-sugestoes">
                <button className="bt-slide bt-left-slide" id="bt-left-slide-sugestoes" onClick={btLeftSlideSugestoes}><i class="fas fa-angle-left"></i></button>
                {movies.map(movie => {
                        return (
                        <>
                            <div className="movie movies-sugestoes" key={movie.id}>

                                <Link to={`/assistir=${filmeSerie}&${movie.id}`} onClick={()=>recarregar()}>
                                    <img loading="lazy" src={`${image_path}${movie.poster_path}`} alt={movie.title} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";}}/>
                                    <section className="section-informacoes-movie">
                                        <div class="div-avaliacao-movie">
                                            <span class="span-estrela-movie">
                                                <i class="fas fa-star"></i>
                                            </span>
                                            <span>{movie.vote_average.toFixed(1)}</span>
                                        </div>
                                            {movie.first_air_date &&
                                                <span>{movie.first_air_date.slice(0,4)}</span>
                                            }
                                            {movie.release_date &&
                                                <span>{movie.release_date.slice(0,4)}</span>
                                            }   
                                    </section>
                                </Link>
                                <span className="span-titulo-movie">{movie.title}{movie.name}</span>
                            </div>
                        </>
                        )
                    })
                }
                <button className="bt-slide bt-right-slide" id="bt-right-slide-sugestoes" onClick={btRightSlideSugestoes}><i class="fas fa-angle-right"></i></button>
            </div>
        </div>
    )
}