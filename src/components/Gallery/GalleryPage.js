import React, { Component } from "react";
import { MDBContainer, MDBCard } from "mdbreact";

import "../../assets/Lightbox.css";
import Gallery from "./Gallery";
import HeaderImage from "../HeaderImage";
import Axios from "axios";
import {RootUrl} from "../constants";

class Gallery2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      albums: []
    };
  }

  componentDidMount() {
    Axios.get(`${RootUrl}/album`, {
      params: {category_id: this.props.category_id}
    }).then(response => {
      this.setState({albums: response.data.albums});
    });
  }

  render() {
    return (
        <Gallery
            documents={this.state.documents}
        />
    );
  }
}

class GalleryPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: 'בה"ד 15 פורים 2019',
      headerImage:
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg",
      images: [
        "https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(63).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(66).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(65).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(67).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(68).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(64).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(69).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(59).jpg",
        "https://mdbootstrap.com/img/Mockups/Lightbox/Original/img%20(70).jpg"
      ]
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
}

  render() {
    const { name, headerImage, images } = this.state;
    return (
      <React.Fragment>
        <HeaderImage imageLink={headerImage} />
        <h1 className="h1-title mb-4 text-center">{name}</h1>
        <MDBContainer
          fluid
          className="text-center"
          style={{ alignItems: "center" }}
        >
          <MDBCard className="text-center" style={{ padding: "0 20px" }}>
            <Gallery images={images} />
          </MDBCard>
        </MDBContainer>
      </React.Fragment>
    );
  }
}
export default GalleryPage;
