import React, { Component } from "react";
import {
  MDBNav,
  MDBContainer,
  MDBTabPane,
  MDBTabContent,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import { RootUrl } from "./constants";
import Axios from "axios";

class NavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      categories: [],
      isLoading: true
    };

    this.getCategories();
  }

  toggleTab = activeTab => e => this.setState({ activeTab });

  getCategories = () => {
    const { page_ref } = this.props;

    Axios.get(`${RootUrl}/category`, { params: { page_ref } })
      .then(response => {
        this.setState({
          categories: response.data.categories,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  render() {
    const { render } = this.props;
    const { categories, isLoading } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (this.state.error) {
      return <div>{this.state.error}</div>;
    }
    const nav_items = categories.map(({ name, icon }, category_index) => {
      return (
        <MDBNavItem>
          <MDBNavLink
            to="#"
            className={
              this.state.activeTab === `${category_index + 1}` ? "active" : ""
            }
            onClick={this.toggleTab(`${category_index + 1}`)}
            role="tab"
          >
            <div style={{ fontSize: "24px" }}>
              {icon && <MDBIcon icon={icon} className="mb-2 ml-2" />} {name}
            </div>
          </MDBNavLink>
        </MDBNavItem>
      );
    });
    const nav_contents = categories.map(({ _id }, index) => (
      <MDBTabPane tabId={`${parseInt(index) + 1}`} role="tabpanel">
        {" "}
        {render(_id)}
      </MDBTabPane>
    ));

    return (
      <React.Fragment>
        <MDBContainer fluid className="text-center">
          <MDBNav
            tabs
            className="nav-justified upper-navigation"
            color="indigo"
          >
            {nav_items}
          </MDBNav>
          <MDBTabContent
            className="card"
            activeItem={this.state.activeTab}
            className="text-center my-5 inner-nav-tab-pane"
          >
            {nav_contents}
          </MDBTabContent>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default NavComponent;
