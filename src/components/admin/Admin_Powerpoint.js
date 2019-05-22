import React, { Component } from "react";
import EditableNav from "./EditableNav";
import { PowerpointRef } from "../constants";
import Admin_Ppt_EditableTable from './Admin_Ppt_EditableTable';
// _id: "1",
// name: "Anna Doe",
// iconName: "chess-pawn",
// href: "/ab_guidance/chapter_1/מסמכים בבינה מלאכותית2.docx"

class Admin_Powerpoint extends Component {
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
        <h1 className="h1-title mb-4 text-center">ניהול מצגות</h1>
        <EditableNav
          page_ref={PowerpointRef}
          render={category_id => (
            <Admin_Ppt_EditableTable category_id={category_id} />
          )}
        />
      </React.Fragment>
    );
  }
}
export default Admin_Powerpoint;
