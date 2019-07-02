import React , {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faArrowAltCircleRight, faShareSquare} from "@fortawesome/fontawesome-free-regular"
import ImageUpload from './imageUpload';


export default class SendMessage extends Component {
    constructor(props){
        super(props)

        this.state = {
            usrInput: "",
            bot: {
                image: "../../static/assets/images/botImage.jpg",

            },
            botResponse: "Hi, I’m Emma. A Watson Assistant. I can provide you with account info and bank hours & locations."
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(e) {
        event.preventDefault()
        this.setState({[e.target.name]: e.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        const usrInput = this.state.usrInput

        fetch ("http://localhost:5000/sendmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({usrInput: usrInput})
        })
        .then(response => {return response.json()})
        .then(response => {this.setState({
            botResponse: response.output.text[0]
        })})
        .catch(error => {
            console.log("Fetch Error", error )
        })
    }

    render() {
        const image = this.state.bot.image
        return(
            <div className="chat-wrapper">
                <div className="chat">
                    <div className="bot-profile-name">
                        <p className="bot-profile-header">Emma | Chatbot Assistant</p>
                    </div>
                        <form onSubmit={this.handleSubmit}>
                            <div className="bot-profile-wrapper">
                                <div className="bot-image-wrapper">
                                    <img src={image}/>
                                </div>
                                <div className="chat-box-response-wrapper">
                                    <p className="bot-response">{this.state.botResponse}</p>
                                </div>
                            </div>


                            <div className="input-wrapper">
                                <div className="input-text-wrapper">
                                <a className="submit-icon" onClick={this.handleSubmit}>
                                <FontAwesomeIcon icon={faShareSquare}/>
                                </a>
                                <textarea className="input-box"type="text" name="usrInput" value={this.state.usrInput} onChange={this.handleChange}/>
                                </div>
                                <div>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
}