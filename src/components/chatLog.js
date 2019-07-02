import React, {Component} from "react"
import SendMessage from "./send_message"
import botImage from "../../static/assets/images/botImage.jpg"


export default class ChatLog extends Component {
    constructor(props) {
        super(props)

        this.state = {
            chatLogs: ""
        }

    }

    componentDidMount(){
        fetch ("http://localhost:5000/chatlog", {
            method: "GET",
            headers: {
                accepts: "application/json",
            }
        })
        .then(response => {return response.json()})
        .then(response => {this.setState({chatLogs: response.logs[0].response.output.text[0]})})
    }

    render() {
        return(
            <div>
                <SendMessage {...this.props.botResponse} />
            <form onSubmit={this.handleSubmit}>
                <h1>{this.state.botResponse}</h1>
            </form>
            </div>
        )
    }
}