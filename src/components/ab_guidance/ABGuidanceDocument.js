import React, { Component } from "react";
import { MDBIcon, MDBListGroupItem } from "mdbreact";
class ABGuidanceDocument extends Component {
  render() {
    const { name, href } = this.props;
    return (
      <React.Fragment>
        <a href={href} download={name} className="documents-a-color">
          <MDBListGroupItem className="ab-list">
            <h4 className="paperclip-wording">
              <MDBIcon
                icon="paperclip"
                fixed
                size="lg"
                className="paper-clip"
              />{" "}
              {name}
            </h4>
          </MDBListGroupItem>
        </a>{" "}
      </React.Fragment>
    );
  }
}
export default ABGuidanceDocument;
