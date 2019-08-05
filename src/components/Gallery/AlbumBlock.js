import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {MDBCol, MDBMask, MDBView} from "mdbreact";
import {RootUrl} from "../constants";
import { Link } from "react-router-dom";
import Axios from "axios";

const AlbumBlock = ({ name, _id }) => {
  const [previewImgUrl, setPreviewImgUrl] = useState();
  useEffect(() => {
    Axios.get(`${RootUrl}/picture`, {
      params: {
        'album_id': _id
      }
    }).then(({data}) => {
      setPreviewImgUrl(data.pictures[0].file_id);
    }).catch(err => {
      console.error(err);
    });

  }, [_id]);

  return (
    <MDBCol className="col-3 products-col">
      <Link to={`/gallery/${_id}`}>
        {" "}
        <div className="card card-cascade mb-4 ">
          <div className="view view-cascade overlay mb-3">
            <MDBView hover zoom>
              <MDBMask className="flex-center">
                <p className="white-text">Zoom effect</p>
              </MDBMask>
            </MDBView>
            <img className="card-img-top" src={previewImgUrl ? `${RootUrl}/file?id=${previewImgUrl}` : require('../../assets/gallery_background.jpg')} alt="Card image cap" />
            <a>
              <div className="mask rgba-white-slight waves-effect waves-light" />
            </a>
          </div>

          <div className="card-body card-body-cascade text-center">
            <h4 className="card-title">
              <strong>{name}</strong>
            </h4>
          </div>
        </div>
      </Link>
    </MDBCol>
  );
};

AlbumBlock.propTypes = {};
AlbumBlock.defaultProps = {};

export default AlbumBlock;
