import React, { Component } from "react";
import { MDBCol } from "mdbreact";
import { Link } from "react-router-dom";
class BranchPhoto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const branchSize = 130;
    const { name, imageURL, _id } = this.props;
    return (
      <React.Fragment>
        <MDBCol className="col-branch-photo" style={{ margin: "10px 50px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <Link to={`branches/${_id}`}>
            <img
              src={imageURL}
              className="img-fluid mx-auto mb-4"
              style={{width: "80px"}}
              width="60px"
            />
            <h3 className="headline-text-color">{name}</h3>
          </Link>
        </MDBCol>
      </React.Fragment>
    );
  }
}
export default BranchPhoto;
