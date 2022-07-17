import { APIKey } from "../../../config/key";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../style.css'

export default function PagPopularSerie(props) {
    const image_path = 'https://image.tmdb.org/t/p/w500'
    const [movies, setMovies] = useState([])

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/${props.categoriaSerie}?api_key=${APIKey}&language=pt-BR`)
            .then(Response => Response.json())
            .then(data => {
                setMovies(data.results)
            })

    }, [props.categoriaSerie])


    var divSlider = document.getElementById("movie-list1")
    var btLeft = document.getElementById("bt-left-slide1")
    function btLeftSlide1() {
        divSlider.scrollLeft -= 380;
        if (divSlider.scrollLeft < 10) {
            btLeft.style.display = "none";
        }
    }
    
    function btRightSlide1() {
        divSlider.scrollLeft += 380;
        btLeft.style.display = "block";
        btLeft.style.left = "-20px";
        btLeft.style.padding = "0 40px 0 20px";
    }

    setTimeout(()=>{
        if(props.categoriaSerie == 'popular') {
            document.getElementById("label-categoria-serie-1").click();
        }
    }, 1)

    return(
        
        <div className="content-movies content-series">
            <div className="div-name-categoria-movie">
                <h2 className="h2-filme-serie-titulo-categoria">Séries</h2>
                <div className="div-escolher-categoria-movie">
                    <section className="section-categoria-movie">
                        <input type="radio" name="input-radio-categoria-serie" id="input-radio-categoria-serie-1"/>
                        <label htmlFor="input-radio-categoria-serie-1" id="label-categoria-serie-1">
                            <span onClick={()=>props.setCategoriaSerie('popular')}>Populares</span>
                        </label>
                    </section>
                    <section className="section-categoria-movie">
                        <input type="radio" name="input-radio-categoria-serie" id="input-radio-categoria-serie-2"/>
                        <label htmlFor="input-radio-categoria-serie-2">
                            <span onClick={()=>props.setCategoriaSerie('top_rated')}>Avaliações</span>
                        </label>
                    </section>
                </div>
            </div>
            <div className="div-movies" id="movie-list1">
                <button className="bt-slide bt-left-slide" id="bt-left-slide1" onClick={btLeftSlide1}><i class="fas fa-angle-left"></i></button>
                {movies.map(movie => {
                    return (
                        <div className="movie" key={movie.id}>
                            <Link to={`/assistir=tv&${movie.id}`}>
                                <img loading="lazy" src={`${image_path}${movie.poster_path}`} alt={movie.title} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";}}/>
                                <section className="section-informacoes-movie">
                                    <div class="div-avaliacao-movie">
                                        <span class="span-estrela-movie">
                                            <i class="fas fa-star"></i>
                                        </span>
                                        <span>{movie.vote_average.toFixed(1)} </span>
                                    </div>
                                    {movie.first_air_date &&
                                        <span>{movie.first_air_date.slice(0,4)}</span>
                                    }
                                    {movie.release_date &&
                                        <span>{movie.release_date.slice(0,4)}</span>
                                    }
                                </section>
                            </Link>
                            <span className="span-titulo-movie">{movie.name}</span>
                        </div>
                        )
                    })
                }
                <button className="bt-slide bt-right-slide" id="bt-right-slide1" onClick={btRightSlide1}><i class="fas fa-angle-right"></i></button>
            </div>
        </div>
    )
}