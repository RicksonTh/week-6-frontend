//Comando RC para criar um novo component
import React, { Component } from 'react';
import logo from "../../assets/logo.svg";
import "./styles.css";

export default class Main extends Component {
  render() {
      //Para usar javascript dentro do html devo usar {}
    return (
        <div id="main-container">
            <form action="">
                <img src={logo} alt="" />
                <input placeholder="Criar uma box" />
                <button type="submit">Criar</button>
            </form>
        </div>
    );
  }
}
