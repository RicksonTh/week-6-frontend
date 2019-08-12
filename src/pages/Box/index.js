import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';

import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';
import socket from 'socket.io-client';

export default class Box extends Component {
  state = { box: {} }

  async componentDidMount() {
    this.subscribeToNewFiles();

    const box = this.props.match.params.id;
    console.log(this.props);
    //para pegar o id da box
    const response = await api.get(`boxes/${box}`);
    //chamando a rota 
    this.setState({ box: response.data });
    //armazenando essas informações no state do componente
  } 

subscribeToNewFiles = () => {
  const box = this.props.match.params.id;
  //pegando o id da box
  const io = socket("https://week-6-b.herokuapp.com");
  //conexão com o socket

  io.emit("connectRoom", box);
  //conectando a sala

  io.on("file", data => {
    this.setState({ box: { ... this.state.box, files: [data, ... this.state.box.files] } })
    //inclui um novo state, e não altera o original. Segue o conceito de imutabilidade
  });
};

handleUpload = (files) => {
  files.forEach(file => {
    const data = new FormData();
    //enviar dados a api sem usar um form 
    const box = this.props.match.params.id;
    //id da box

    data.append('file', file);
    //adicionar uma informação, como na rota de file no campo 'file'

    api.post(`boxes/${box}/files`, data);
  });
}

//Header: cabeçalho
//Ul e li: lista
//MdInsertDriveFile: icon 
//Map precisa que a primeira tag ou elemento que venha depois dela tenha uma key ou registro único. No caso, o id do file
//O Dropzone usa o conceito de Render Props, que basicamente o conteudo dele precisa ser uma function
  render () {
    return (
      <div id="box-container">
        <header>
          <img src={logo} alt="" />
          <h1>{this.state.box.title}</h1>
        </header>

        <Dropzone onDropAccepted={this.handleUpload}>
          {({ getRootProps, getInputProps }) => (
            <div className="upload" { ...getRootProps()}>
              <input { ...getInputProps()} />

              <p>Arraste arquivos ou clique aqui</p>
            </div>
          )}
        </Dropzone>

        <ul>
          {this.state.box.files && 
             this.state.box.files.map( file => (
          <li key={file._id}>
            <a className="fileInfo" href={file.url} target="blank">
              <MdInsertDriveFile size={24} color="#A5Cfff" />
              <strong>{file.title}</strong>
            </a>

            <span>
              Há{" "}
              {distanceInWords(file.createdAt, new Date(), {
                locale:pt
              })}
            </span>
          </li>
          ))}
        </ul>
      </div>
    );
  }
}


