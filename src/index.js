import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Routes, Route } from 'react-router-dom'
import BarraNav from './componentes/nav';
import Assistir from './paginas/assistir';
import Home from './paginas/home';
import Pesquisar from './paginas/pesquisar';
import PesqusiarGenero from './paginas/pesquisar/genero';
import Pessoa from './paginas/pessoa';
import './global.css';

setTimeout(()=>{
  ReactDOM.render(
    <HashRouter>
      <BarraNav />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/assistir=:filmeSerie&:id/" element={<Assistir/>}/>
        <Route path="/comentarios:popUpComentarios/:filmeSerie&:id/" element={<Assistir/>}/>
        <Route path="/elenco:popUpAtores/:filmeSerie&:id/" element={<Assistir/>}/>
        <Route path="/pesquisar/" element={<Pesquisar/>}/>
        <Route path="/pesquisar/search=:movieName&pagina=:numeroPagina/" element={<Pesquisar/>}/>
        <Route path="/:filmeSerie/genero=:idGenero/:generoPesquisado&infantil=:infantil&pagina=:numeroPagina/" element={<PesqusiarGenero/>}/>
        <Route path="/pessoa=:idPessoa/" element={<Pessoa/>}/>
      </Routes>
    </HashRouter>,
    document.getElementById('app')
  );
}, 2000)