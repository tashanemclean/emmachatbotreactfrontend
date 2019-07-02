import React, {Component }from "react"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import { faPaperPlane} from "@fortawesome/fontawesome-free-regular" 


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
        .then(classifyResponse => {this.setState({classify: classifyResponse})})

        function resolveAfter1Second() {
            classified_as = {classify}
            return new Promise(resolve => {
                setTimeout(() =>{
                    resolve(classified_as[0]["classifyResponse"]["images"][0]["classifiers"][0])
                }, 1000)
            })
        }

    
        async function asyncCall() {
            const classified = []
            var result = await resolveAfter1Second()
            classified.push(result)
            console.log(classified)
        }
        asyncCall()
    }


    render(){

        return (
            <form onSubmit={this.handleUploadImage}>
                <div>
                    <input ref={(ref) => {this.uploadInput = ref}} type='file'/>
                </div>
                <div>
                    <h1>Image classified As:</h1>
                </div>
                <br />
                <div>
                    <button className="image-upload"><FontAwesomeIcon icon={faPaperPlane}/></button>
                </div>
                <img src={this.state.imageURL}/>
            </form>
        )
    }

}