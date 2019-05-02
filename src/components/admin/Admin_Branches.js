import React, { Component } from "react";
import EditableNav from "./EditableNav";
import Admin_Branch_EditableTable from "./Admin_Branch_EditableTable";
import { BranchRef } from "../constants";

class Admin_Branch extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול מסמכים נפוצים</h1>
        <EditableNav
          page_ref={BranchRef}
          render={category_id => (
            <Admin_Branch_EditableTable category_id={category_id} />
          )}
        />
      </React.Fragment>
    );
  }
}
export default Admin_Branch;
