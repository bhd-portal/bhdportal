import React, { Component } from "react";
import "../../assets/Lightbox.css";
import HeaderImage from "../HeaderImage";
import AlbumsBlock from './AlbumsBlock';
import {GalleryRef} from "../constants"
import NavComponent from "../NavComponent";

class GalleriesPage extends Component {

  state = {
    photoIndex: 0,
    isOpen: false
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <>
        <HeaderImage
          imageLink={require('../../assets/gallery_background.jpg')}
          title="גלריית התמונות"
        />
        <NavComponent
          page_ref={GalleryRef}
          // render works with _id as a parameter,
          // so we need to the function to get the albums from this `_id` in categories
          render={(category_id) => <AlbumsBlock category_id={category_id}/>}
        />
      </>
    );
  }

}
export default GalleriesPage;