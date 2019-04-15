import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import {
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBView,
  MDBMask,
  MDBCard,
  MDBContainer
} from "mdbreact";
import HeaderImage from "./HeaderImage";
import LinkPhotoFlipBranch from "./LinkPhotoFlipBranch";
import MadorsList from "./MadorsList";
class BranchesPage extends Component {
  // Receive here props of the branch's name and pull the data from the
  // database accordingly
  constructor(props) {
    super(props);
    this.branchName = this.props.match.params.branch;
    this.state = {
      name: this.branchName,
      vision:
        // need to pull this data from database
        "מערך ההדרכה למודיעין ולסייבר שותף למשימה המודיעינית ואיכותה, במקצוענות הדרכתית מתחדשת ופורצת דרך",

      purpose:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      commander:
        "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
      madors: [
        {
          mador_name: "מדור טכנולוגיות",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },
        {
          mador_name: "מדור חדר אוכל",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },
        {
          mador_name: "מדור חדר אוכל",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },
        {
          mador_name: "מדור חדר אוכל",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },

        {
          mador_name: "מדור חדר אוכל",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },
        {
          mador_name: "מדור חדר אוכל",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },

        {
          mador_name: "מדור צביקה",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },

        {
          mador_name: "מדור יצירה",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },

        {
          mador_name: "מדור עמרי",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        },
        {
          mador_name: "מדור קניות",
          front_text:
            "במסגרת תורות הניתוח של הטקסט, ניתן למצוא גם את תורת חקר השיח ואת תורת הרטוריקה. תורות ניתוח שונות מבצעות את ניתוח  הטקסט " +
            " ...",
          back_test:
            "accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque coraccusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque cor"
        }
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    // const mador_name = "מדור של קוראל";
    // const front_text =
    //   "Everyone who is new to React is confused by these so called props, because they are never mentioned in any other web framework, and rarely explained on their own. They are one of the ea";
    // const back_text =
    //   "Normally you start out with React’s JSX syntax for rendering something to the browser when learning about React. Basically JSX mixes HTML with JavaScript to get the best of both worlds";
    if (this.branchName === "") {
      return <Redirect to="/" />;
    }

    return (
      <React.Fragment>
        <HeaderImage
          title={this.state.name}
          imageLink="https://mdbootstrap.com/img/Photos/Slides/img%20(134).jpg"
        />

        <MDBContainer fluid className="text-center ">
          {/* <LinkPhotoFlipBranch
            mador_name={mador_name}
            front_text={front_text}
            back_text={back_text}
          /> */}

          <MadorsList madors={this.state.madors} />
          {/* <MDBCard
          className="px-5 pb-3"
          style={{ marginRight: "2%", marginLeft: "2%", marginBottom: "2%" }}
        >
          <MDBCardBody>
            <MDBRow className="text-right">
              <MDBCol lg="3">
                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                  <img
                    className="img-fluid"
                    src="http://www.cfdaz.com/sites/g/files/awx4056/f/images/vision-page%28NES%29_1498154476.jpg"
                    alt=""
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" />
                  </a>
                </MDBView>
              </MDBCol>
              <MDBCol lg="9">
                <a href="#!" className="green-text" />
                <h3 className="font-weight-bold mb-3 p-0">
                  <strong>חזון המערך</strong>
                </h3>
                <blockquote>
                  <h4>{this.state.vision}</h4>
                </blockquote>
              </MDBCol>
            </MDBRow>
            <hr className="my-3" />
            <MDBRow className="text-center">
              <MDBCol lg="9">
                <h3 className="font-weight-bold mb-3 p-0">
                  <strong>יעוד המערך</strong>
                </h3>
                <p>{this.state.purpose}</p>
              </MDBCol>
              <MDBCol lg="3">
                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/img%20(34).jpg"
                    alt=""
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" />
                  </a>
                </MDBView>
              </MDBCol>
            </MDBRow>
            <hr className="my-3" />
            <MDBRow className="text-center">
              <MDBCol lg="3">
                <MDBView className="rounded z-depth-2 mb-lg-0 mb-4" hover waves>
                  <img
                    className="img-fluid"
                    src="https://mdbootstrap.com/img/Photos/Others/img (28).jpg"
                    alt=""
                  />
                  <a href="#!">
                    <MDBMask overlay="white-slight" />
                  </a>
                </MDBView>
              </MDBCol>
              <MDBCol lg="9">
                <h3 className="font-weight-bold mb-3 p-0">
                  <strong>דבר המפקד</strong>
                </h3>
                <p>{this.state.commander}</p>
                <img
                  className="img-fluid text-left"
                  src="https://openclipart.org/image/2400px/svg_to_png/273582/putin_sign.png"
                  alt=""
                />
              </MDBCol>
            </MDBRow>
          </MDBCardBody>
        </MDBCard> */}
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default BranchesPage;
