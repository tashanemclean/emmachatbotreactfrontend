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
                botResponse: "Hi, I’m Emma. A Watson Assistant. I can provide you with account info and bank hours & locations."
            },
            allInput: []
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputAndResponseToArray = this.inputAndResponseToArray.bind(this)
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
            bot: {botResponse: response.output.text[0]}
        })})
        .catch(error => {
            console.log("Fetch Error", error)
        })
    }

    inputAndResponseToArray(){
        const usrInput = this.state.usrInput
        const x = this.state.allInput
        const y = this.state.bot
        x.push(y)
        x.push({
            usrInput: `${usrInput}`
        })

    }

    chatLogs = () =>{
        this.inputAndResponseToArray()
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
                            {Object.values(this.state.allInput).map(rec => (
                              <div className="chat-two">
                                  <div className="bot-profile-wrapper_two"
                                  style={{
                                      "margin": "14px"
                                  }}
                                  >
                                    <div className="bot-image-wrapper_two">
                                        <img style={{
                                            'height': '30px' ,
                                            'width': '30px', 
                                            'borderRadius': '20px'
                                            }} src={rec.image}
                                        />
                                     </div>
                                    <div className="chat-box-response-wrapper-two"
                                    style={{
                                        "marginLeft": "35px",
                                        "marginBottom": "20px",
                                        "backgroundColor": "#afece7",
                                        "paddingRight": "30px",
                                        "borderRadius": "12px"
                                    }}
                                    >
                                        <p className="bot-response_two"
                                        style={{
                                            "margin": "8px",
                                        "fontSize": "1.3rem",
                                        "color": "#706c61",
                                        }}
                                        >{rec.botResponse}
                                        </p>
                                    </div>
                                    <div className="user-input-wrapper"
                                    style={{
                                        "marginLeft": "35px",
                                        "marginBottom": "20px",
                                        "backgroundColor": "#e9e9e9",
                                        "paddingRight": "30px",
                                        "borderRadius": "12px"
                                    }}
                                    >
                                        <p className="user-input"
                                        style={{
                                            "margin": "8px",
                                            "fontSize": "1.3rem",
                                            "color": "rgb(112, 108, 97)"
                                        }}
                                        >{rec.usrInput} {console.log(rec)}
                                        </p>
                                    </div>
                                  </div>
                              </div>
                            ))}
                            <div className="input-wrapper">
                                <div className="input-text-wrapper">
                                    <a className="submit-icon" 
                                    onClick={this.handleSubmit}
                                    >
                                    <FontAwesomeIcon 
                                    onClick={this.chatLogs}
                                    icon={faShareSquare}
                                    />
                                    </a>
                                    <textarea 
                                    className="input-box" 
                                    type="text" name="usrInput" 
                                    value={this.state.usrInput} 
                                    onChange={this.handleChange}
                                    />
                                </div>
                            </div>
                            <div className="bot-image-wrapper">
                                <img style={{
                                    'height': '30px' ,
                                    'width': '30px', 
                                    'borderRadius': '20px'
                                    }} src={image}
                                    />
                            </div>
                            <div className="chat-box-response-wrapper">
                                <p className="bot-response">
                                {this.state.bot.botResponse}
                                </p>
                            </div>
                        </form>
                </div>
            </div>
        )
    }
}