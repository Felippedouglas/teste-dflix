import Tippy from '@tippyjs/react';
import { useState } from 'react';
import 'tippy.js/dist/tippy.css';
import copy from "copy-to-clipboard";
import './style.css';

export default function Compartilhar() {


    const [copyText, setCopyText] = useState(document.location.href);
    
    const copyToClipboard = () => {
       copy(copyText);
       alert(`Copiado para área de transferência "${copyText}"`);
    }


    function redirecionar(e) {
        setTimeout(()=>{
            window.location.href = e
        })
    }

    return (
        
        <div className='content-compartilhar-assistir'>
            <div>
                <input type="text" value={copyText}/>
                <button onClick={copyToClipboard}><i class="fa-regular fa-copy"></i></button>
            </div>
            <div className='content-compartilhar-assisitr-redes-sociais'>
                <Tippy content='Compartilhar no WhatsApp'>
                    <section>
                        <a onClick={()=>redirecionar(`https://api.whatsapp.com/send?text=${window.location.href}`)}><i class="fa-brands fa-whatsapp"></i></a>
                    </section>
                </Tippy>
                <Tippy content='Compartilhar no Facebook'>
                    <section>
                        <a onClick={()=>redirecionar(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)}><i class="fa-brands fa-facebook-f"></i></a>
                    </section>
                </Tippy>
                <Tippy content='Copiar Link'>
                    <section>
                        <a onClick={copyToClipboard}><i class="fa-solid fa-link"></i></a>
                    </section>
                </Tippy>
            </div>
        </div>
    )
}