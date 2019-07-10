import React , {Component} from 'react'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faShareSquare, faCommentDots} from "@fortawesome/fontawesome-free-regular"


export default class SendMessage extends Component {
    constructor(props){
        super(props)

        this.state = {
            // usrInput: "",
            image: "../../static/assets/images/botImage.jpg",
            typing: false,
            bot: {
                botResponse: "Hi, I’m Emma. A Watson Assistant. I can provide you with account info and bank hours & locations."
            },
            allInput: []
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.inputAndResponseToArray = this.inputAndResponseToArray.bind(this)
        this.clearInput = this.clearInput.bind(this)
    }

    clearInput(){
        const usrInput = this.refs.usrInput.value=""
    }

    handleSubmit(event) {
        event.preventDefault()
        const usrInput = this.refs.usrInput.value

        this.chatLogs()
        this.clearInput()
        this.setTyping()
        
    
        fetch ("http://localhost:5000/sendmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body:JSON.stringify({usrInput: usrInput})
        })
        .then(response => {return response.json()})
        .then(response => {
            this.setState({
                bot: {botResponse: response.output.text[0]}
            })
        })
        .catch(error => {
            console.log("Fetch Error", error)
        })
    }

    typingInterval = () => {
        this.typeInt = setInterval(() => {
            (this.setState({typing: true}))
            }, 1)
    }

    notTypingInterval = () => {
       this.notTypeInt = setInterval(() => {
            (this.setState({typing: false}))               
            }, 6000)
    }

    clearIntervals =()=> {
        setInterval(()=> {
            clearInterval(this.typeInt, this.NotTypeInt)
        }, 6000)
    }

    setTyping = () => {
        this.typingInterval()
        this.notTypingInterval()
        this.clearIntervals()
    }

    inputAndResponseToArray(){
        const usrInput = this.refs.usrInput.value
        const x = this.state.allInput
        const y = this.state.bot
        x.push(y)
        x.push({
            usrInput: `${usrInput}`
        })
    }

    chatLogs = () => {
        this.inputAndResponseToArray()
    }

    botTyping = () => {
            return <p className="comment-span" ><FontAwesomeIcon icon={faCommentDots}/></p>
        }
    
    botNotTyping = () =>{
        return <p className="bot-response">{this.state.bot.botResponse}</p>
    }

    render() {
        const image = this.state.image
        return(
            <div className="chat">
                <div className="bot-profile-name">
                    <p className="bot-profile-header">Emma | Chatbot Assistant</p>
                </div>
                    <form onSubmit={this.handleSubmit}>
                        {Object.values(this.state.allInput).map((rec, _id) => (
                            <div key={_id} className="chat-two">
                                <div className="bot-profile-wrapper_two"
                                style={{
                                    "margin": "14px"
                                }}
                                >
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
                                    "borderRadius": "12px",
                                }}
                                >
                                    <p className="user-input"
                                    style={{
                                        "margin": "8px",
                                        "fontSize": "1.3rem",
                                        "color": "rgb(112, 108, 97)"
                                    }}
                                    >{rec.usrInput}
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
                                icon={faShareSquare}
                                />
                                </a>
                                <textarea 
                                className="input-box" 
                                type="text" name="usrInput" ref="usrInput"
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
                        { this.state.typing == true ?
                        (
                        this.botTyping()
                        ) : (
                            this.botNotTyping()
                        )
                        }
                        </div>
                    </form>
            </div>
        )
    }
}

