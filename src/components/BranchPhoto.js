import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
class BranchPhoto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const branchSize = 130;
    const { name, imageURL, link } = this.props;
    return (
      <React.Fragment>
        <MDBCol className="col-branch-photo" style={{ margin: "0 3%" }}>
          <Link to={`branches/${name}`}>
            <img
              src={imageURL}
              className="rounded-circle img-fluid mx-auto mb-4 z-depth-2"
              height={branchSize}
              width={branchSize}
            />
            <h3>{name}</h3>
          </Link>
        </MDBCol>
      </React.Fragment>
    );
  }
}
export default BranchPhoto;
