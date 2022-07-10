import { Link } from "react-router-dom"
import './style.css';
import $ from 'jquery';


export default function BarraNav() {

    $(window).on('scroll', function() {
        if ($(window).scrollTop() >= 1) {
            document.getElementById('content-nav').style.background = '#000';
        } else if ($(window).scrollTop() == 0){
            document.getElementById('content-nav').style.background = 'initial';
        }
    })

    return(

        <div className='content-nav' id="content-nav">
            <Link to="/"><img className="logo-dflix" src="https://www.dflix.online/icones/dflix.svg" alt="logo-dflix" /></Link>
            <Link to={`/pesquisar/`} className='icone-lupa-pesquisar'><i className="fas fa-search"></i></Link>
        </div>
    )
}