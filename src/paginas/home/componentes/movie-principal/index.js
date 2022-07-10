import './style.css';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { APIKey } from '../../../../config/key';

export default function MoviePrincipal() {

    const [ audioVideo, setAudioVideo ] = useState(false);
    const [ movie, setMovie ] = useState({});

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/tv/66732?api_key=${APIKey}&language=pt-BR`)
        .then(Response => Response.json())
        .then(data => {
            setMovie(data);
            console.log(movie)
            });
    }, []);

    setTimeout(()=>{
        document.getElementById("video-movie-principal").play();
        document.getElementById("bt-mute-movie-principal").style.opacity = 1;
    }, 5000);

    function audioMoviePrincipal() {
        setAudioVideo(!audioVideo);
        if (audioVideo) {
            document.getElementById("video-movie-principal").muted = true;
        } else {
            document.getElementById("video-movie-principal").muted = false;
        }
    };

    return(
        <>
            <div className="content-movie-principal">
                <div className="div-video-background">
                    <video
                        id='video-movie-principal'
                        src="https://br.vid.web.acsta.net/uk/medias/nmedia/55/16/06/09/16/19550599_hd_013.mp4"
                        poster='https://occ-0-1172-3852.1.nflxso.net/dnm/api/v6/6AYY37jfdO6hpXcMjf9Yu5cnmO0/AAAABYzhhHawREGhR6iUa-f_u4eaMTbYUTEmTvuLjDWrgLvGkfB9l0IoZxM1ZbbuHZHGVWVjQ74rC08Yf8SVM-qwlEPqb_F-CxKMPl_2.webp?r=3e3'
                        muted loop>
                    </video>
                    <section className='section-mute-movie-principal'>
                        <button className='bt-mute-movie-principal' id='bt-mute-movie-principal' onClick={()=>audioMoviePrincipal()}>{audioVideo?<i class="fa-solid fa-volume-high"></i>:<i class="fa-solid fa-volume-xmark"></i>}</button>
                        <section className='section-classificacao-movie-principal'>
                            <span className='span-classificacao-movie-principal'>16</span>
                        </section>
                    </section>
                </div>
                <div className="div-detalhes-movie-principal">
                    <img src='https://occ-0-1172-3852.1.nflxso.net/dnm/api/v6/LmEnxtiAuzezXBjYXPuDgfZ4zZQ/AAAABUy6CHy5uWYILu5Isy2mCcZmwtuBG-UW9bMmhmWCFN3_HuqH7FZROitHtCKcwjU8hl7_SABe3HqoTkdaSCx8Fe2ADL4Gn2qp_YiK0nj0lxnwzY1oYZWsJmCG9RH0I5xvW4MLjFef4Ncw1EpbgncPmtXo8nEseTfpNmo7QnsNv_L0rcMq_8C7Zw.webp?r=e5e' height='150px' alt='img movie'/>
                    <section class="informacoes-movie-principal">
                        <span className='ano-lancamento-movie-principal'>2016 |</span>
                        <span><i class="fas fa-history"></i> {movie.episode_run_time}min |</span>
                        <span><i class="fas fa-star"></i> {movie.vote_average}/10</span>
                    </section>
                    <section className='section-bts-assistir-movie-principal'>
                        <Link to={`/assistir=tv&${movie.id}`} className='bt-assistir-movie-principal'><i class='fas fa-play'></i>Assistir</Link>
                        <Link to={`/assistir=tv&${movie.id}`} className='bt-detalhes-movie-principal'><i class='fas fa-info-circle'></i>Detalhes</Link>
                    </section>
                </div>
            </div>
        </>
    )
}