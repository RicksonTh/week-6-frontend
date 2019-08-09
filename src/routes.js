//Para que o front faça navegações, é necessário a lib react-router-dom
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Main from './pages/Main';
import Box from './pages/Box';

const Routes = () => (
    //Mais um '()' para identificar que são várias linhas
    <BrowserRouter>
       <Switch>
           <Route path= "/" exact component={Main} />
           <Route path= "/box/:id" component={Box} />  
       </Switch>
    </BrowserRouter>
);
//<BrowserRouter/> define o compoortamento da rota. As rotas ficam apenas com barras
//<Switch/> vai garantir que apenas uma rota seja chamada por momento. Cada end chama apenas uma rota
//'path=""': é o endereço que o user irá usar para chamar a rota
//Toda vez que eu usar a sintaxe JSX(javascript e html) é preciso ter importada a lib do React
//'component={}': é o componente que quero chamar
//exact define que o nome da rota precisa ser exatamente igual a principal

export default Routes;