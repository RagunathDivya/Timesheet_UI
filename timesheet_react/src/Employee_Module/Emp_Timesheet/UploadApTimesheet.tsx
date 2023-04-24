import React, { useState, Component } from "react";
import { message } from "antd";
import axios from "axios";
import { render } from "react-dom";

const setMessage = (statusCode:number, responseMessage:string) => {
    if (statusCode == 200) {
        message.success(responseMessage);
    }
    else if (statusCode == 404) {
        message.error(responseMessage);
    }
    else if (statusCode == 400) {
        message.error(responseMessage);
    }
    else if (statusCode == 500) {
        message.error("Internal Server Error");
    }
    else {
        message.error(responseMessage);
    }
}

class UploadApTimesheet extends Component {

    state = {
        selectedFile: null
    }
    
    fileSelectedHandler = (event:any) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
    }
        // const handleFormSubmit = async (values: any) => {
            
        //     const [file, setFile] = useState<File | null>(null);
        //      setFile(event.target.files[0]);
        //     const formData = new FormData();
        //     formData.append("image", file as File);
        //      const { data: { imagePath } } = await axios.post("https://localhost:7117/api/Emp/UploadImage", formData);
            
            
            
        //     const dataToSave = {
        //     ...values,
        //     imageFileName: imagePath,
        //      };
        //      await axios.post("https://localhost:7117/api/Emp/Register", dataToSave)
        //     .then((response) => {
        //     message.success("Row added successfully");
        //     })
        //     .catch((error) => {
        //         setMessage(error.response.status, "Image is Not Uploaded");
        //     });
        //      };
    

    render() {
        return (
            <div>
                <input type="file" onChange={this.fileSelectedHandler}></input><br />
               {/* <button onClick={this.handleFormSubmit}>Upload</button> */}
            </div>
        )
    }
}
    
export default UploadApTimesheet;
