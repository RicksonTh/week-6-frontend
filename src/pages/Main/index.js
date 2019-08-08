//Comando RC para criar um novo component
import React, { Component } from 'react';
import api from '../../services/api';

import logo from "../../assets/logo.svg";
import "./styles.css";

export default class Main extends Component {
state = {
//Vai armazenar toda mutação no componente e fazer com que o render seja disparado
  newBox: ""
};

handleSubmit = async e => {
//Vai ser chamado toda vez que o form receber um submit 
  e.preventDefault();
  
  const response = await api.post("boxes", {
  //response representa a requisição a api
  //o método deve ser igual ao que está na api(post, get etc)
    title: this.state.newBox
    //Aqui vai o corpo da requisição. Não precisa ser em json, pois o axios já converte
  });

  console.log(response.data);
};

handleInputChange = e => {
//função que vai atribuir um valor ao state
  this.setState({ newBox: e.target.value });
  //target representa o input. Portanto, definir um valor ao state usa-se o setState
};

 //onSubmit vai ser disparada quando o user clicar no botão ou dar enter
  render() {
      //Para usar javascript dentro do html devo usar {}
    return (
        <div id="main-container">
            <form onSubmit={this.handleSubmit}>
                <img src={logo} alt="" />
                <input 
                placeholder="Criar uma box"
                value={this.state.newBox}
                onChange={this.handleInputChange}
                />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
