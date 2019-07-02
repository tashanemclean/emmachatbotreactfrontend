import React, { Component } from 'react';
import ChatLog from './chatLog';
import Modal from "react-modal"


import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faCommentAlt} from "@fortawesome/fontawesome-free-regular"
import ImageUpload from './imageUpload';

 const customStyles = {
  content: {
      top: "55%",
      left: "77%",
      right: "auto",
      marginRight: "-20%",
      transform: "translate(-20%, -20%",
      width: "300px",
      color: "black",
      border: "0px",
      overflow: "none"
  },
  overlay: {
    backgroundColor: "none"
  }

}

Modal.setAppElement('.app-wrapper')

export default class App extends Component {
  constructor(){
    super()

    this.state = {
      loggedInStatus: "LOGGED_IN",
      modalIsOpen: false,
      featured_image: ""
    }

    this.handleModalClose = this.handleModalClose.bind(this)
    this.handleModalOpen = this.handleModalOpen.bind(this)

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this)
    this.handleUnsucesfulLogin = this.handleUnsucesfulLogin.bind(this)
  }

  handleModalClose(){
    this.setState({modalIsOpen: false})
  }

  handleModalOpen(){
    this.setState({modalIsOpen: true})
  }

  handleSuccessfulLogin(){
    this.setState({loggedInStatus: "LOGGED_IN"})
  }

  handleUnsucesfulLogin(){
    this.setState({loggedInStatus: "NOT_LOGGED_IN"})
  }

  render() {
    return (
      <div className='app'>
        <h1>Emma | IBM Watson Assistant Chatbot</h1>
        <ImageUpload />
        <h2>React Redux Router</h2>
        <a className="modal-icon" onClick={this.handleModalOpen}><FontAwesomeIcon icon={faCommentAlt}/></a>
        <Modal 
        isOpen={this.state.modalIsOpen}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.handleModalClose}
        style={customStyles}
        contentLabel="Example Modal"
        >
        <ChatLog /></Modal>
      </div>
    );
  }
}
