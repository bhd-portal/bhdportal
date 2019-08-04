import React, { Component } from "react";
import { MDBBtn, MDBIcon, MDBTooltip } from "mdbreact";
import { Link } from "react-router-dom";
import classNames from "classnames";
import "./AdminSideNavBar.css";

const pathToTab = {
  homepage: 1,
  products: 2,
  ab_guidance: 3,
  documents: 4,
  gallery: 5,
  branches: 6,
  powerpoint: 7,
  'commander-words': 8,
  advanced: 9
};

class AdminSideNavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 1
    };
  }

  componentDidMount() {
    const path = this.props.location.pathname.split("/")[2];
    if (path) {
      this.setState({ activeTab: pathToTab[path] });
    }
  }

  render() {
    const className = tabId =>
      classNames({ active: this.state.activeTab === tabId });
    return (
      <div className="side-bar">
        <Link to="/admin/homepage">
          <MDBTooltip placement="left" tooltipContent="דף הבית">
            <MDBBtn
              className={className(1)}
              onClick={() => this.setState({ activeTab: 1 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              {" "}
              <MDBIcon icon="home" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/products">
          <MDBTooltip placement="left" tooltipContent="קטלוג תוצרי הדרכה">
            <MDBBtn
              className={className(2)}
              onClick={() => this.setState({ activeTab: 2 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              <MDBIcon icon="dice-d6" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/ab_guidance">
          <MDBTooltip placement="left" tooltipContent='א"ב הדרכה'>
            <MDBBtn
              className={className(3)}
              onClick={() => this.setState({ activeTab: 3 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              <MDBIcon icon="book-open" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/documents">
          <MDBTooltip placement="left" tooltipContent="טפסים נפוצים">
            <MDBBtn
              className={className(4)}
              onClick={() => this.setState({ activeTab: 4 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              <MDBIcon icon="paperclip" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/gallery">
          <MDBTooltip placement="left" tooltipContent="גלריה">
            <MDBBtn
              className={className(5)}
              onClick={() => this.setState({ activeTab: 5 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              <MDBIcon icon="images" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/branches">
          <MDBTooltip placement="left" tooltipContent="ענפים">
            <MDBBtn
              className={className(6)}
              onClick={() => this.setState({ activeTab: 6 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              {" "}
              <MDBIcon icon="code-branch" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/powerpoint">
          <MDBTooltip placement="left" tooltipContent="מצגות">
            <MDBBtn
              className={className(7)}
              onClick={() => this.setState({ activeTab: 7 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              {" "}
              <MDBIcon icon="file-powerpoint" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/commander-words">
          <MDBTooltip placement="left" tooltipContent="דבר המפקד">
            <MDBBtn
              className={className(8)}
              onClick={() => this.setState({ activeTab: 8 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              {" "}
              <MDBIcon icon="flag" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
        <Link to="/admin/advanced">
          <MDBTooltip placement="left" tooltipContent="מתקדם">
            <MDBBtn
              className={className(9)}
              onClick={() => this.setState({ activeTab: 9 })}
              onMouseEnter={this.onHover}
              onMouseLeave={this.onMouseLeave}
              floating
              color="blue"
            >
              <MDBIcon icon="user-cog" size="md" />
            </MDBBtn>
          </MDBTooltip>
        </Link>
      </div>
    );
  }
}
export default AdminSideNavBar;
