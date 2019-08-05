//Esse é o arquivo principal onde o react vai iniciar
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
//Importa o arquivo App.js

ReactDOM.render(<App />, document.getElementById('root'));
// 1. Se não tiver conteúdo, "App" pode ser declarado como uma tag e ser fechado na mesma linha.
// 2. 'Root' vai exibir o que está dentro da div lá no index.html


