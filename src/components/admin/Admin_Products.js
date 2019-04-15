import React, { Component } from "react";
import Admin_Prod_EditableTable from "./Admin_Prod_EditableTable";
import EditableNav from "./EditableNav";
import EditableSubNav from "./EditableSubNav";
import { ProductRef } from "../constants";

class Admin_Products extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <h1 className="h1-title mb-4 text-center">ניהול תוצרי הדרכה</h1>
        <EditableNav
          page_ref={ProductRef}
          render={category_id => (
            <EditableSubNav
              category_id={category_id}
              render={subcategory_id => (
                <Admin_Prod_EditableTable subcategory_id={subcategory_id} />
              )}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default Admin_Products;
