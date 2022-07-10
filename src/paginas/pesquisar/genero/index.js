import GeneroFilme from "./componentes/filme"
import GeneroSerie from "./componentes/serie"
import { useParams } from "react-router-dom"
import './style.css'

export default function PesqusiarGenero() {

    const { generoPesquisado } = useParams()
    document.title = `Filmes e Séries de ${generoPesquisado} - DFLIX`

    return(
        <div className="div-genero-pesquisado">
            DISPONÍVEL EM BREVE!
        </div>
    )
}