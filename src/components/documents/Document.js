import React, { Component } from "react";
import { MDBCardBody, MDBIcon, MDBCard, MDBCardUp, MDBAvatar } from "mdbreact";
import Axios from "axios";
import { RootUrl } from "../constants";

export default class Document extends Component {
  downloadFile(href) {
    var file = Axios.get(`${RootUrl}/file/${href}`);
  }

  render() {
    const { name, icon, href } = this.props;
    return (
      <React.Fragment>
        <a href={href} download={name} className="documents-a-color">
          <MDBCard testimonial>
            <MDBCardUp className="card-up2" />

            <MDBAvatar className="docum-avatar mx-auto default-color view-overlay text-center z-depth-1">
              <MDBIcon size="2x" icon={icon} className="docum-icon" />
            </MDBAvatar>

            <MDBCardBody>
              <h4 className="card-title card-down" style={{ color: "black" }}>
                {name}
              </h4>
            </MDBCardBody>
          </MDBCard>
        </a>
      </React.Fragment>
    );
  }
}
