import React, { Component } from "react";
import { MDBRow } from "mdbreact";
import NavComponent from "./NavComponent";
import SubNavComponent from "./SubNavComponent";
import ProcductsList from "./ProcductsList";
import HeaderImage from "./HeaderImage";
import { ProductRef } from "./constants";

class ProductsPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <React.Fragment>
        <HeaderImage
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(137).jpg"
          title="קטלוג תוצרי הדרכה"
        />
        <NavComponent
          page_ref={ProductRef}
          render={category_id => (
            <SubNavComponent
              category_id={category_id}
              render={subcategory_id => (
                <MDBRow center className="products-row2">
                  <ProcductsList
                    type="col-3 products-col"
                    subcategory_id={subcategory_id}
                  />
                </MDBRow>
              )}
            />
          )}
        />
      </React.Fragment>
    );
  }
}

export default ProductsPage;
