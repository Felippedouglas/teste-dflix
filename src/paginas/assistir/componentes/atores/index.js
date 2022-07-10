import { useEffect, useState } from 'react';
import PopUp from '../../../../componentes/pop-up';
import { APIKey } from '../../../../config/key';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import './style.css';
import { useParams } from 'react-router-dom';

export default function Atores(props) {

    const [ atores, setAtores ] = useState([]);
    const image_path = 'https://image.tmdb.org/t/p/w500';
    const [ popUp, setPopUp ] = useState(false);
    const {  filmeSerie, id, popUpAtores } = useParams();
    
    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/${props.filmeSerie}/${props.id}/credits?api_key=${APIKey}&language=pt-BR`)
        .then(Response => Response.json())
        .then(data => {
            setAtores(data.cast);
            console.log(data.cast);
            })

            if (popUpAtores == '=true') {
                setPopUp(!popUp);
        }
    }, []);

    function redirecionar(idAtor) {
        window.location.href = `/#/pessoa=${idAtor}`;
    }
    
    function abrirElenco() {
        setPopUp(!popUp);
        window.location.href = `/#/elenco=true/${filmeSerie}&${id}`;
    }

    return (
        <>

            <div className='div-atores'>

                {atores.map(ator =>{
                    if (ator.order <= 3) {
                        return(
                            <Tippy content='Detalhes'>
                                <section className='ator' onClick={()=>redirecionar(ator.id)}>
                                    <link></link>
                                    <img loading="lazy" src={`${image_path}${ator.profile_path}`} alt={ator.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";}}/>
                                    <section className='section-nome-ator-personagem'>
                                        <span className='nome-ator'>{ator.original_name}</span>
                                        <span className='nome-personagem'>{ator.character}</span>
                                    </section>
                                </section>
                            </Tippy>
                        )
                    }
                })}

                <Tippy content='Ver Elenco'>
                    <span className='span-abrir-popup-atores' onClick={()=>abrirElenco()}><i class="fas fa-plus-circle"></i></span>
                </Tippy>

            </div>
            
            <PopUp popUp={popUp} setPopUp={setPopUp}>

                <h2 className='h2-titulo-popup'>Elenco</h2>
                {atores.map(ator =>{
                    if (ator) {
                        return (
                            <section className='ator ator-pop-up' onClick={()=>redirecionar(ator.id)}>
                                <img loading="lazy" src={`${image_path}${ator.profile_path}`} alt={ator.name}  onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";}}/>
                                <section className='section-nome-ator-personagem'>
                                    <span className='nome-ator'>{ator.original_name}</span>
                                    <span className='nome-personagem'>{ator.character}</span>
                                </section>
                                <span className='seta-hover-pop-up-atores'><i class="fas fa-angle-right"></i></span>
                            </section>
                        )
                    }
                })}
                
            </PopUp>

        </>
    )
}