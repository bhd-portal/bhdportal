import React, { Component } from "react";
import ABGuidanceDocumentCard from "./ABGuidanceDocumentCard";

import HeaderImage from "../HeaderImage";
import { ABGuidanceRef } from "../constants";

import NavComponent from "../NavComponent";
import SubNavComponent from "../SubNavComponent";

class ABGuidancePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(138).jpg"
          title='א"ב בהדרכה'
        />
        <NavComponent
          page_ref={ABGuidanceRef}
          render={category_id => (
            <SubNavComponent
              category_id={category_id}
              render={subcategory_id => (
                <ABGuidanceDocumentCard subcategory_id={subcategory_id} />
              )}
            />
          )}
        />
      </React.Fragment>
    );
  }
}
export default ABGuidancePage;
