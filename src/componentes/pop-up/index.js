import { useParams } from 'react-router-dom';
import './style.css';

export default function PopUp(props) {

    const { filmeSerie, id } = useParams();

    function popUp() {
        props.setPopUp(!props.popUp)
        window.location.href = `/#/assistir=${filmeSerie}&${id}`
    }

    return (props.popUp) ? (
        <div className="container-pop-up">
            <div className="pop-up">
                <button className='bt-fechar-popup' onClick={()=>popUp()}><i class="fa-solid fa-xmark"></i></button>
                { props.children }
            </div>
        </div>
    ) : "";
}