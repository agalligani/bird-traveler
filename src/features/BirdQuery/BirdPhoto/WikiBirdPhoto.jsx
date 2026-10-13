/*
 * BirdPhoto component
 * Displays a photo of a bird based on species name or code.
 * Currently uses a static image as a placeholder.
 * Uncomment the Flickr request code to fetch actual photos from Flickr.
 */

import React, { useState, useEffect } from "react";
import config from "../../../wikiConfig";
import axios from "axios"
import { writeToCache, readFromCache } from '../../../utils'


const renderBirdPhoto = (speciesName, picUrl, width, height) => {
  return (
    <li key={`bird-photo-li-${speciesName}`} className="image-item">
      <img alt={speciesName} src={picUrl} width={width} height={height} />
      <p className="overlay">
        <span>{speciesName}</span>
      </p>
    </li>
  );
};

const WikiBirdPhoto = (props) => {
  const [photoData, setPhotoData] = useState({})

useEffect(
      () => {
      // localStorage.clear()
      let requestConfig = config.axiosConfig
      requestConfig.params.titles = props.speciesName
      let cachedData = readFromCache("wiki-photo-" + props.speciesName);
      if (cachedData) {
        console.log("Using cached data for species:", props.speciesName);
        setPhotoData(cachedData);
      } else {
        axios(requestConfig)
          .then(res => {
            let data = res.data.query.pages;
            data = Object.values(data).map(page => ({
              title: page.title,
              thumbnail: page.thumbnail ? page.thumbnail.source : null,
              width: page.thumbnail ? page.thumbnail.width : null,
              height: page.thumbnail ? page.thumbnail.height : null,
              description: page.pageprops ? page.pageprops.description : null
            }));
            console.log("Fetched data for species:", props.speciesName, data);
            setPhotoData(data);
            writeToCache("wiki-photo-" + props.speciesName, data);
            return data;
          })
          .then(data => {
            if (data.length === 0) {
              // setPhotoData(res.photos.photo[0]);
              console.log("No data found for species:", props.speciesName);
            } else {
              console.log("Data fetched for species:", props.speciesName, data);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      renderBirdPhoto(props.speciesName, photoData[0]?.thumbnail, photoData[0]?.width, photoData[0]?.height);

    }, [props.speciesName]
  )  

  if (props.speciesName) {
    return (
      renderBirdPhoto(props.speciesName, photoData[0]?.thumbnail)
    )
  } else {
    return (
      <div>No species name provided</div>
    )
  }
}
export default WikiBirdPhoto
