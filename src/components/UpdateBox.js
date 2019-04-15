import React, { Component } from "react";
import { UpdateBullet, UpdateCol } from "./UpdateComponents";

class UpdateBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: ""
    };

    this.toggleCollapse = this.toggleCollapse.bind(this);
  }

  toggleCollapse = collapseID => () =>
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : ""
    }));

  render() {
    const { updates } = this.props;
    const collapseID = this.state.collapseID;
    let updates_array = updates.slice(0, Math.min(10, updates.length));
    const updatesLength = updates_array.length;
    if (updatesLength <= 5) {
      let cards = updates_array.map((update, index) => {
        return (
          <UpdateBullet
            collapseID={collapseID}
            id={`collaps${index}`}
            toggleCollapse={this.toggleCollapse}
            {...update}
          />
        );
      });

      return <UpdateCol>{cards}</UpdateCol>;
    } else {
      let firstHalf = updates_array.slice(0, Math.ceil(updatesLength / 2));
      let secondHalf = updates_array.slice(
        Math.ceil(updatesLength / 2),
        updatesLength
      );

      const rightCards = firstHalf.map((update, index) => {
        return (
          <UpdateBullet
            collapseID={collapseID}
            id={`collaps${index}`}
            toggleCollapse={this.toggleCollapse}
            {...update}
          />
        );
      });

      const leftCards = secondHalf.map((update, index) => {
        return (
          <UpdateBullet
            collapseID={collapseID}
            id={`collaps${index + updatesLength}`}
            toggleCollapse={this.toggleCollapse}
            {...update}
          />
        );
      });

      return (
        <React.Fragment>
          <UpdateCol>{rightCards}</UpdateCol>
          <UpdateCol>{leftCards}</UpdateCol>
        </React.Fragment>
      );
    }
  }
}
export default UpdateBox;
