import React, { Component } from "react"
import ReactModal from "react-modal"

React.Modal.setAppElement(".app-wrapper")

export default class ChatModal extends Component {
    constructor(props){
        super(props)

        this.customStyles = {
            content: {
                top: "20%",
                left: "20%",
                right: "auto",
                marginRight: "-20%",
                transform: "translate(-20%, -20%",
                width: "300px",
                color: "black"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.75"
            }
        }
    }

    render() {
        return(
            <ReactModal
            style={this.customStyles}
            onRequestClose={()=>{
                this.props.handleModalClose();
            }} isOpen={this.props.modalIsOpen}
            >
            </ReactModal>
        )
    }
}