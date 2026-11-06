/*
 * BirdPhoto component
 * Displays a photo of a bird based on species name or code.
 * Currently uses a static image as a placeholder.
 * 
 * Used in BirdQueryDateRange and BirdQueryFullRegional components.
 */

import { useState, useEffect } from "react";
import config from "../../../wikiConfig";
import axios from "axios"
import { writeToCache, readFromCache } from '../../../utils'
const requestConfig = config.axiosConfig
  
const ExtractBirdPhoto = (props) => {
  // localStorage.clear()
  const photo = {url: null, speciesName: props.speciesName}
  requestConfig.params.titles = props.speciesName
  let cachedData = readFromCache("wiki-photo-" + props.speciesCode);
  if (cachedData) {
    photo.url = cachedData[0].thumbnail
  } else {
    axios(requestConfig)
      .then(res => {
        let data = res.data.query.pages;
        data = Object.values(data).map(page => ({
          title: page.title,
          thumbnail: page.thumbnail ? page.thumbnail.source : null,
          width: page.thumbnail ? page.thumbnail.width : null,
          height: page.thumbnail ? page.thumbnail.height : null,
          description: page.pageprops ? page.pageprops.description : null,
        }));
        writeToCache(`wiki-photo-${props.speciesCode}`, data);
          photo.url = data[0].thumbnail
          return data;
        })
      .then(data => {
          if (data.length === 0) {
            console.log("No data found for species:", props.speciesName);
          } else {
            photo.url = data.thumbnail
            photo.speciesName = data.title
          }})
          .catch(function (error) {
            console.log(error);
          });
      }
      return photo
}

const renderBirdPhoto = (speciesName, picUrl, width, height, speciesCode) => {

  return picUrl ? (
    <>
      <img alt={speciesName} src={picUrl} width={width} height={height} />
      <p className="overlay">
        <span>{speciesName}</span>
      </p>
    </>
  ) : (
    <>
      <button onClick={ 
        (e) => {
          e.stopPropagation()
          let editedSpeciesName = prompt("Please enter updated species name:", speciesName)
          // window.alert(editedBirdName + "-" + speciesCode)
          // let requestConfig = config.axiosConfig
          requestConfig.params.titles = editedSpeciesName
                  axios(requestConfig)
          .then(res => {
            let data = res.data.query.pages;
            data = Object.values(data).map(page => ({
              title: page.title,
              thumbnail: page.thumbnail ? page.thumbnail.source : null,
              width: page.thumbnail ? page.thumbnail.width : null,
              height: page.thumbnail ? page.thumbnail.height : null,
              description: page.pageprops ? page.pageprops.description : null,
            }));
            writeToCache("wiki-photo-" + speciesCode, data);
            return data;
          })
          .then(data => {
            if (data.length === 0) {
              // setPhotoData(res.photos.photo[0]);
              window.alert("No data found for species:", editedSpeciesName);
            } else {
            }
          })
          .catch(function (error) {
            console.log(error);
          });
        }} > Find Image
        </button><br/>
      <span>{speciesName}</span>
    </>
  );
};

const BirdPhoto = (props) => {
  const [photoData, setPhotoData] = useState({})

useEffect(
      () => {
      // localStorage.clear()
      // const requestConfig = config.axiosConfig
      requestConfig.params.titles = props.speciesName
      let cachedData = readFromCache("wiki-photo-" + props.speciesCode);

      if (cachedData) {
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
              description: page.pageprops ? page.pageprops.description : null,
            }));
            setPhotoData(data);
            writeToCache("wiki-photo-" + props.speciesCode, data);
            return data;
          })
          .then(data => {
            if (data.length === 0) {
              console.log("No data found for species:", props.speciesName);
            } else {
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      renderBirdPhoto(props.speciesName, photoData[0]?.thumbnail, photoData[0]?.width, photoData[0]?.height, photoData[0]?.speciesCode);

    }, [props.speciesName]
  )  

  if (props.speciesName) {
    return (
      renderBirdPhoto(props.speciesName, photoData[0]?.thumbnail, null, null, props.speciesCode)
    )
  } else {
    return (
      <div>No species name provided</div>
    )
  }
}
export { BirdPhoto, ExtractBirdPhoto }