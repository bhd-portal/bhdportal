import React, { Component } from "react";
import { MDBCardBody, MDBIcon, MDBCard, MDBCardUp, MDBAvatar } from "mdbreact";
export default class Document extends Component {
  render() {
    const { name, iconName, href } = this.props;
    return (
      <React.Fragment>
        <a href={href} download={href}>
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
        </a>
      </React.Fragment>
    );
  }
}
