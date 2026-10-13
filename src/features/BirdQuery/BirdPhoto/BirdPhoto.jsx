/*
 * BirdPhoto component
 * Displays a photo of a bird based on species name or code.
 * Currently uses a static image as a placeholder.
 * Uncomment the Flickr request code to fetch actual photos from Flickr.
 */

import React, { useState, useEffect } from "react";
import { createFlickr } from "flickr-sdk"
import config from "../../../config.json"

const { flickr } = createFlickr(config.flickrConfig.key)
const requestPhotoFromState = ( speciesCode ) => {
    console.log(speciesCode)
    const url = "http://whatever.com"
    return url
}

/*todo - check out wikipedia api for fetching bird photos */
/* https://en.wikipedia.org/w/api.php?action=query&prop=pageimages|pageprops&format=json&piprop=thumbnail&titles=Great%20Hornbill&pithumbsize=300&redirects */

const BirdPhoto = (props) => {
  const [photoData, setPhotoData] = useState({})
  useEffect(() => {
    if (props.speciesCode) {
      requestPhotoFromState(props.speciesCode)
    } else {
      requestPhotoFromFlickr(props.speciesName)
    }
  },[]);

  const requestPhotoFromFlickr = async (speciesName) => {

    try {
        var res = await flickr("flickr.photos.search", {
          text: speciesName,
          media: "photos",
          per_page: 1,
          page: 1,
          extras: true
      })

      setPhotoData(res.photos.photo[0])

      } catch (error) {
          console.error(error)
      }
  }

  if (props.speciesName && photoData != undefined) {
    return (
      <li key={"bird-photo-li-"+props.speciesName} className="image-item">
        {/* <img alt="stub" src="https://cdn.download.ams.birds.cornell.edu/api/v1/asset/45223631/2400"/> */}
        <img alt={photoData.title} src = {`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}_b.jpg`}/>
        <div className="overlay"><span>{props.speciesName}</span></div>
    </li>

    )
  }

  return (
    <img src="" alt="bird foto" />
  )
}
export default BirdPhoto
