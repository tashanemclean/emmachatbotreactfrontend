import React, {Component} from "react"
import {withRouter} from "react-router"
import Dropzone from "react-dropzone"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faImage} from "@fortawesome/fontawesome-free-regular"


export default class Dropzonearea extends Component{
    constructor(props){
        super(props)

        this.uploadImage = this.uploadImage.bind(this)
    }

    uploadImage(file){
        event.preventDefault()


        const fileobject = {
            'name' : file[0].name,
            'path' : file[0].path,
            'size' : file[0].size,
            'type' : file[0].type
        };

        console.log(fileobject);

        fetch ("http://localhost:5000/imageupload", {
            method: "POST",
            headers: {
                "Content-Type": "text/html",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "POST GET OPTIONS",
               "Access-Control-Allow-Headers": "Origin, Accept, Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
            },
            body:fileobject
        })
        .then(response => {return response.json()})
        .catch(error => {
            console.log("Image Send Error", error)
        })

    }

    render(){
        return(                
            <Dropzone onDrop={acceptedFiles => this.uploadImage(acceptedFiles)}>

                {({getRootProps, getInputProps}) => (
                    <section>
                        <div {...getRootProps()}>
                            <input {...getInputProps()}/>
                            
                            <button className="dropzone-icon"><FontAwesomeIcon icon={faImage} /></button>
                        </div>
                    </section>
                )}

            </Dropzone>

        )
    }
}

