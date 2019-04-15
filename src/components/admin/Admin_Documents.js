import React, { Component } from "react";
import EditableNav from "./EditableNav";
import Admin_Doc_EditableTable from "./Admin_Doc_EditableTable";
import { DocumentsRef } from "../constants";
// _id: "1",
// name: "Anna Doe",
// iconName: "chess-pawn",
// href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"

class Admin_Documents extends Component {
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
          page_ref={DocumentsRef}
          render={category_id => (
            <Admin_Doc_EditableTable category_id={category_id} />
          )}
        />
      </React.Fragment>
    );
  }
}
export default Admin_Documents;
