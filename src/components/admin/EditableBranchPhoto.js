import React, { Component } from "react";
import { MDBCol, MDBIcon } from "mdbreact";
import { Link } from "react-router-dom";
import "./EditableBranchPhoto.css";

class EditableBranchPhoto extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const branchSize = 130;
    const { name, imageURL, index, handleToggle, _id } = this.props;
    return (
      <React.Fragment>
        <MDBCol className="col-branch-photo" style={{ margin: "0 2%" }}>
          <div className="branch-container">
            <Link to={`/admin/branches/${_id}`}>
              <img
                src={imageURL}
                className="rounded-circle img-fluid mx-auto mb-4 z-depth-2 branch-photo"
                height={branchSize}
                width={branchSize}
              />
              <h3>{name}</h3>
            </Link>
            <div className="icons">
              <MDBIcon
                className="branch-icon blue-text"
                icon="edit"
                onClick={handleToggle("editModal", index)}
              />
              <MDBIcon
                className="branch-icon red-text pr-3"
                icon="times"
                onClick={handleToggle("deleteModal", index)}
              />
            </div>
          </div>
        </MDBCol>
      </React.Fragment>
    );
  }
}
export default EditableBranchPhoto;
