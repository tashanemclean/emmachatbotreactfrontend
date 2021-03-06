import React, {Component }from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faPaperPlane} from "@fortawesome/fontawesome-free-regular" 


export default class ImageUpload extends Component {

    constructor(props){
        super(props)

        this.state = {
            imageURL: '',
            classify: []
        }
        this.handleUploadImage = this.handleUploadImage.bind(this)
    }

    handleUploadImage(ev) {
        ev.preventDefault()

        const data = new FormData()

        data.append('file', this.uploadInput.files[0])        
        fetch('http://localhost:5000/upload', {
            method: "POST",
            headers: {"accepts": "application/json"},
            body: data
        })
        .then(response => {return response.json()})
        .then(result => this.setState({
            classify: result["images"][0]["classifiers"][0]["classes"][0]["class"]
        }))
    }
    
    render(){
        const classified_as = this.state.classify
        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => {this.uploadInput = ref}} type='file'/>
                </div>
                <div>
                    <h1> Please upload a drivers license to classify. <p>That is a:</p></h1>
                </div>
                <br />
                <div>
                    <button onClick={this.showClassifier} className="image-upload"><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
                <img src={this.state.imageURL}/>
            </form>
        )
    }

}