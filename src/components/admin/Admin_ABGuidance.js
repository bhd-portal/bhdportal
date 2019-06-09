import React, { Component } from "react";
import Admin_ABGuidance_EditableTable from "./Admin_ABGuidance_EditableTable";
import EditableNav from "./EditableNav";
import EditableSubNav from "./EditableSubNav";
import { ABGuidanceRef } from "../constants";

class Admin_Documents extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול מסמכי א"ב בהדרכה</h1>
        <EditableNav
          page_ref={ABGuidanceRef}
          render={category_id => (
            <EditableSubNav
              category_id={category_id}
              render={subcategory_id => (
                <Admin_ABGuidance_EditableTable
                  subcategory_id={subcategory_id}
                />
              )}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Admin_Documents;
