import React, { Component } from "react";
import {
  MDBCol,
  MDBRow,
  MDBCardBody,
  MDBView,
  MDBMask,
  MDBBtn,
  MDBCard
} from "mdbreact";
import "../assets/HomePage.css";
import "../pages/pro/sections/VideoBackgroundPage.css";
import bgvideo from "../assets/bgvideo.mp4";
import Lightbox from "react-image-lightbox";
import UpdateBox from "./UpdateBox";
import "../assets/Lightbox.css";
import ProcductsList from "./ProcductsList";
import BranchList from "./BranchList";
import { Link } from "react-router-dom";
import Axios from "axios";

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bgvideo: bgvideo,
      title: "פורטל מערך ההדרכה",
      subtitle: "למודיעין ולסייבר",
      collapseID: "",
      photoIndex: 0,
      isOpen: false,
      ideals: [],
      branches: [
        {
          name: "מטה",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg"
          // link: "#"
        },
        {
          name: "ענף הדרכה",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: "ענף מקצועות הסיגינט",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: "ענף מודיעין השטח",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: 'מוד"ש ומחקר',
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: "ענף מפקדים",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: 'תחום ב"מ',
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: "ענף סייבר",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        },
        {
          name: "מפרשית",
          imageURL: "https://mdbootstrap.com/img/Photos/Avatars/img%20(30).jpg",
          link: "#"
        }
      ],
      updates: [],
      isLoading: true
    };

    this.getUpdates();
    this.getIdeals();
  }

  getUpdates = () => {
    Axios.get(`http://localhost:5003/api/news`)
      .then(response => {
        this.setState({ updates: response.data, isLoading: false });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  renderImages = () => {
    let photoIndex = -1;
    const { images } = this.state;

    return images.map(imageSrc => {
      photoIndex++;
      const privateKey = photoIndex;
      return (
        <MDBCol md="1" key={photoIndex}>
          <figure>
            <img
              src={imageSrc}
              alt="Gallery"
              className="img-fluid"
              onClick={() =>
                this.setState({ photoIndex: privateKey, isOpen: true })
              }
            />
          </figure>
        </MDBCol>
      );
    });
  };

  getIdeals = () => {
    Axios.get(`http://localhost:5003/api/ideals`)
      .then(response => {
        this.setState({ ideals: response.data });
      })
      .catch(() => {
        this.setState({ error: "Error fetching posts", isLoading: false });
      });
  };

  renderIdeals() {
    var idealsElements = this.state.ideals.map(ideal => (
      <MDBCol style={{ backgroundColor: "#ede7f6" }}>
        <MDBRow center>
          <h3 className="font-weight-bold mb-3 mt-2 p-0">
            <strong>{ideal.name}</strong>
          </h3>
        </MDBRow>
        <MDBRow center>
          <h5 style={{ padding: "5%" }}>{ideal.text}</h5>
        </MDBRow>
      </MDBCol>
    ));
    return idealsElements;
  }

  render() {
    const { updates, products, branches, isLoading, error } = this.state;

    if (isLoading) {
      return <div>טוען</div>;
    }
    if (error) {
      return <div>{error}</div>;
    }
    return (
      <React.Fragment>
        <div id="videobackground">
          <MDBView>
            <video className="video-intro" playsInline autoPlay muted loop>
              <source src={this.state.bgvideo} type="video/mp4" />
            </video>
            <MDBMask
              className="d-flex align-items-center"
              overlay="black-light"
            >
              <MDBRow id="front-page-title-row" className="">
                <MDBCol md="12" className="mb-4 white-text front-page-title">
                  {" "}
                  <p className=" front-page-title font-weight-bold mb-1">
                    {this.state.title}
                  </p>
                  <p className=" font-weight-bold mb-1 front-page-title">
                    {this.state.subtitle}
                  </p>
                </MDBCol>
              </MDBRow>
            </MDBMask>
          </MDBView>
        </div>
        <BranchList branches={branches} />
        <h2
          className="text-right"
          style={{ marginRight: "2%", marginTop: "3%" }}
        >
          :עדכוני מערך ההדרכה
        </h2>{" "}
        <MDBRow center style={{ margin: "1%", direction: "rtl" }}>
          <UpdateBox updates={updates} />
        </MDBRow>
        {/* <MDBCard
          style={{
            marginTop: "3%",
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%"
          }}
        >
          <h2
            className="text-right"
            style={{ marginRight: "2%", marginTop: "1%", marginBottom: "2%" }}
          >
            :תוצרי הדרכה נבחרים
          </h2>{" "}
          <MDBRow
            center
            style={{
              marginTop: "0",
              marginBottom: "0%",
              marginRight: "1%",
              marginLeft: "1%"
            }}
          >
            <ProcductsList products={products} type="home-page-products-col" />
          </MDBRow>{" "}
          <Link to="/products">
            <MDBBtn
              outline
              color="primary"
              className="ml-4 mt-2 mb-4"
              style={{ width: "12%" }}
            >
              :לצפייה בתוצרים נוספים
            </MDBBtn>
          </Link>
        </MDBCard>*/}{" "}
        <MDBCard
          className="px-3 "
          style={{
            marginRight: "2%",
            marginLeft: "2%",
            marginBottom: "2%",
            direction: "rtl"
          }}
        >
          <MDBRow className="text-center ">{this.renderIdeals()}</MDBRow>
        </MDBCard>
      </React.Fragment>
    );
  }
}
export default HomePage;
