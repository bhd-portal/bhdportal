import React, { Component } from "react";
import EditableBranchList from "./EditeableBranchList";
import { MDBContainer } from "mdbreact";

class Admin_Branch extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול ענפים</h1>
        <EditableBranchList />
      </React.Fragment>
    );
  }
}
export default Admin_Branch;
