import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { MDBContainer } from "mdbreact";
import HeaderImage from "./HeaderImage";
import LinkPhotoFlipBranch from "./LinkPhotoFlipBranch";
import MadorsList from "./MadorsList";
import { RootUrl } from "./constants";
import Axios from "axios";
// {
//   mador_name: "מדור טכנולוגיות",
//   front_text:
//     "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
//     " ...",
//   back_test:
//     "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
// },
class BranchesPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      branch_id: this.props.match.params.id,
      madorim: [],
      branch: undefined
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    Axios.get(`${RootUrl}/branch`, {
      params: { id: this.state.branch_id }
    }).then(response => {
      this.setState({ branch: response.data.branch });
    });

    Axios.get(`${RootUrl}/mador`, {
      params: { branch_id: this.state.branch_id }
    }).then(response => {
      this.setState({ madorim: response.data.madorim });
    });
  }

  render() {
    const { branch } = this.state;
    if (this.state.branch_id === "") {
      return <Redirect to="/" />;
    }

    if (!branch) {
      return "Loading...";
    }

    return (
      <React.Fragment>
        <HeaderImage
          title={branch.name}
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
        />

        <MDBContainer fluid className="text-center ">
          <MadorsList madorim={this.state.madorim} />
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default BranchesPage;
