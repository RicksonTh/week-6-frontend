import React, { Component } from 'react';
import { MdInsertDriveFile } from 'react-icons/md';
import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Dropzone from 'react-dropzone';

import logo from '../../assets/logo.svg';
import './styles.css';
import api from '../../services/api';

export default class Box extends Component {
  state = { box: {} }

  async componentDidMount() {
    const box = this.props.match.params.id;
    //para pegar o id da box
    const response = await api.get(`boxes/${box}`);
    //chamando a rota

    this.setState({ box: response.data });
    //armazenando essas informações no state do componente
}

handleUpload = (files) => {
  files.forEach(file => {
    console.log(file);
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


