import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { APIKey } from "../../config/key";
import PessoaFilmeParticipado from "./filmes";
import PessoaSerieParticipado from "./series";
import './style.css'

export default function Pessoa() {

    const { idPessoa } = useParams()
    const [pessoa, setPessoa] = useState([])
    const [idadepessoa, setIdadePessoa] = useState()
    const image_path = 'https://image.tmdb.org/t/p/w500'

    useEffect(() => {
        fetch(`https://api.themoviedb.org/3/person/${idPessoa}?api_key=${APIKey}&language=pt-BR`)
        .then(Response => Response.json())
        .then(data => {
            setPessoa(data)
        })
            
        document.title = `DFLIX`;
    }, [idPessoa])
        
    // definir idade pessoa
    setTimeout(()=>{
        if (pessoa.birthday) {
            if (pessoa.deathday) {
                function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
                    var d = new Date,
                        ano_morte = pessoa.deathday.slice(0,4),
                        mes_morte = pessoa.deathday.slice(5,7),
                        dia_morte = pessoa.deathday.slice(8,10),
                
                        ano_aniversario = +ano_aniversario,
                        mes_aniversario = +mes_aniversario,
                        dia_aniversario = +dia_aniversario,
                
                        quantos_anos = ano_morte - ano_aniversario;
                
                    if (mes_morte < mes_aniversario || mes_morte == mes_aniversario && dia_morte < dia_aniversario) {
                        quantos_anos--;
                    }
                
                    return quantos_anos < 0 ? 0 : quantos_anos;
                }
                setIdadePessoa(idade(pessoa.birthday.slice(0,4), pessoa.birthday.slice(5,7), pessoa.birthday.slice(8,10)));
            } else if(!pessoa.deathday) {
                function idade(ano_aniversario, mes_aniversario, dia_aniversario) {
                    var d = new Date,
                        ano_atual = d.getFullYear(),
                        mes_atual = d.getMonth() + 1,
                        dia_atual = d.getDate(),
                        
                        ano_aniversario = +ano_aniversario,
                        mes_aniversario = +mes_aniversario,
                        dia_aniversario = +dia_aniversario,
                
                        quantos_anos = ano_atual - ano_aniversario;
                
                    if (mes_atual < mes_aniversario || mes_atual == mes_aniversario && dia_atual < dia_aniversario) {
                        quantos_anos--;
                    }
                
                    return quantos_anos < 0 ? 0 : quantos_anos;
                }
                setIdadePessoa(idade(pessoa.birthday.slice(0,4), pessoa.birthday.slice(5,7), pessoa.birthday.slice(8,10)));
            }
        }
    }, 100)

    setTimeout(()=>{
        if(pessoa.name != undefined) {
            document.title = `${pessoa.name} - DFLIX`;
        }
    }, 5000)

    function redirecionarErro() {
        window.location = '/404'
    }
    
    return (
    <>
        {pessoa.name &&
            <div className="container-pessoa" id="container-pessoa">
                <section className="section-pessoa">
                    <img loading="lazy" src={`${image_path}${pessoa.profile_path}`} alt={pessoa.name} onError={({ currentTarget }) => {currentTarget.onerror = null; currentTarget.src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1024px-User-avatar.svg.png";}}/>
                    <h1>{pessoa.name}</h1>
                    <div>
                        {pessoa.birthday &&
                            <span>{pessoa.birthday.slice(8,10)}/{pessoa.birthday.slice(5,7)}/{pessoa.birthday.slice(0,4)}</span>
                        }
                        {pessoa.deathday &&
                            <span> - {(pessoa.deathday).slice(8,10)}/{(pessoa.deathday).slice(5,7)}/{(pessoa.deathday).slice(0,4)}</span>
                        }
                        {pessoa.birthday &&
                            <span> | {idadepessoa} anos</span>
                        }
                    </div>
                    {pessoa.known_for_department == "Acting" &&
                        <span>Ator/Atriz</span>
                    }
                    {pessoa.place_of_birth &&
                        <span>{pessoa.place_of_birth}</span>
                    }
                </section>
                <section>
                    {pessoa.biography != '' &&
                        <section className="section-biográfia-pessoa">
                            <h2 className="h2-titulo-sections">biográfia</h2>
                            <span>{pessoa.biography}</span>
                        </section>
                    }
                    <PessoaFilmeParticipado nomePessoa={pessoa.name}/>
                    <PessoaSerieParticipado nomePessoa={pessoa.name}/>
                </section>
            </div>
        }
        {pessoa.success == false &&
            redirecionarErro()
        }
    </>
    )
}