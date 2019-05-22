import React, { Component } from "react";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';
import Axios from "axios";
import { RootUrl } from "../constants";

export default class Powerpoint extends Component {
  downloadFile(href) {
    var file = Axios.get(`${RootUrl}/file/${href}`);
  }

  render() {
    const { name, imageHref, href } = this.props;
    return (
      <React.Fragment>
      <MDBCard style={{ width: "22rem" }}>
        <MDBCardImage className="img-fluid" src={{imageHref}} waves />
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the card title and make
            up the bulk of the card&apos;s content.
          </MDBCardText>
          <MDBBtn href={href} download={name}>MDBBtn</MDBBtn>
        </MDBCardBody>
      </MDBCard>
      </React.Fragment>
    );
  }
}
