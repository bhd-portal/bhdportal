import React, { Component } from "react";
import { MDBCardBody, MDBIcon, MDBCard, MDBCardUp, MDBAvatar } from "mdbreact";
import Axios from "axios";
import { RootUrl } from "../constants";

export default class Document extends Component {

  downloadFile(href) { 
    var file = Axios.get(`${RootUrl}/file/${href}`);
  } 

  render() {
    const { name, iconName, href } = this.props;
    console.log("href:", href);
    return (
      <React.Fragment>
        <button onClick={() => {this.downloadFile(href)}}>
          <MDBCard testimonial>
            <MDBCardUp className="card-up2" />

            <MDBAvatar className="docum-avatar mx-auto blue-gradient view-overlay text-center z-depth-2">
              <MDBIcon size="3x" icon={iconName} className="docum-icon" />
            </MDBAvatar>

            <MDBCardBody>
              <h4 className="card-title card-down" style={{ color: "black" }}>
                {name}
              </h4>
            </MDBCardBody>
          </MDBCard>
        </button>
      </React.Fragment>
    );
  }
}
