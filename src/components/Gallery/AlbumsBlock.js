import {MDBCard, MDBCol, MDBMask, MDBRow, MDBView} from "mdbreact";
import { RootUrl } from "../constants";
import React, {useState, useEffect} from "react";
import AlbumBlock from './AlbumBlock';
import Axios from "axios";

const AlbumsBlock = ({ category_id }) => {
  const [albums, setAlbums] = useState([]);
  useEffect(() => {
    Axios.get(`${RootUrl}/album`, {
      params: {category_id}
    }).then(({ data }) => {
      setAlbums(data.albums)
    }).catch(err => console.error(err));
  }, [category_id]);

  return (
    <MDBCard style={{ padding: "20px" }}>
      <MDBRow center className="products-row">
        {albums.map((album) => <AlbumBlock {...album} />)}
      </MDBRow>
    </MDBCard>
  );
};

export default AlbumsBlock