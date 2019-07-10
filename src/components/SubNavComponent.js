import React, { Component } from "react";
import {
  MDBNav,
  MDBTabPane,
  MDBTabContent,
  MDBNavItem,
  MDBNavLink,
  MDBIcon
} from "mdbreact";
import Axios from "axios";
import { RootUrl } from "./constants";

class SubNavComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "1",
      subcategories: [],
      isLoading: true,
      error: ""
    };

    this.getSubCategories();
  }

  toggleTab = activeTab => e => this.setState({ activeTab });

  getSubCategories = () => {
    const { category_id } = this.props;

    Axios.get(`${RootUrl}/subcategory`, {
      params: { category_id }
    })
      .then(response => {
        this.setState({
          subcategories: response.data.categories,
          isLoading: false
        });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  render() {
    const { render, parent_index } = this.props;
    const { subcategories, isLoading, error } = this.state;
    if (isLoading) {
      return <div>טוען</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    const nav_items = subcategories.map(
      ({ name, icon, subtitle }, category_index) => {
        return (
          <MDBNavItem style={{ marginLeft: "0px" }}>
            <MDBNavLink
              to="#"
              className={
                this.state.activeTab === `${category_index + 1}` ? "active" : ""
              }
              onClick={this.toggleTab(`${category_index + 1}`)}
              style={{ fontSize: "22px" }}
            >
              <div style={{ fontSize: "24px", marginTop: "12px" }}>
                {icon && <MDBIcon icon={icon} className="mb-2 ml-2" />} {name}
                {subtitle && (
                  <p style={{ fontSize: "20px", marginBottom: "0px" }}>
                    {subtitle}
                  </p>
                )}
              </div>
            </MDBNavLink>
          </MDBNavItem>
        );
      }
    );
    const nav_contents = subcategories.map(({ _id }, index) => (
      <MDBTabPane tabId={`${parseInt(index) + 1}`}> {render(_id)}</MDBTabPane>
    ));

    return (
      <React.Fragment>
        <div class="classic-tabs mb-2">
          <MDBNav classicTabs color="cyan">
            {nav_items}
          </MDBNav>
          <MDBTabContent className="card" activeItem={this.state.activeTab}>
            {nav_contents}
          </MDBTabContent>
        </div>
      </React.Fragment>
    );
  }
}

export default SubNavComponent;
