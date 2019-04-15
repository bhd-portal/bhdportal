import React, { Component } from "react";
import { MDBContainer, MDBBtn } from "mdbreact";
import Dragzone from "./Dragzone";
import Axios from "axios";
import { RootUrl } from "../constants";

class Admin_Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      files: undefined
    };
  }

  handleFiles = files => {
    this.setState({ files });
  };

  uploadFiles = () => {
    if (!this.state.files) {
      return alert("No files");
    }
    console.log(this.state.files);
    const data = new FormData();
    data.append("file", this.state.files[0]);
    data.append("filename", this.state.files[0].name);
    data.append("category", "images");
    Axios.post(`${RootUrl}/file`, data)
      .then(res => {
        console.log(res.data.path);
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול ענפים</h1>
        <MDBContainer fluid className="text-center ">
          <Dragzone handleFiles={this.handleFiles} files={this.state.files} />
          <MDBBtn onClick={this.uploadFiles}> Upload </MDBBtn>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default Admin_Gallery;
