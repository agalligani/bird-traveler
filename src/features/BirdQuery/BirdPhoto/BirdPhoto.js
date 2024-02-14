// import { useSelector } from "react-redux"
import React, { useState, useEffect } from "react";
import { createFlickr } from "flickr-sdk"
import config from "../../../config.json"
// const { flickr } = createFlickr("c0df50748c11abc7c7ef61b7d9a5aab3")

const { flickr } = createFlickr(config.flickrConfig.key)
const requestPhotoFromState = ( speciesCode ) => {
    console.log(speciesCode)
    const url = "http://whatever.com"
    return url
}

const BirdPhoto = (props) => {
  const [photoData, setPhotoData] = useState({})
  // const [isLoading, setIsLoading] = useState(true)

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
          console.error(error) // from creation or business logic
      }
  }


    if (props.speciesCode) {
    // requestPhotoFromState(props.speciesCode)
    return <img src='http://placekitten.com/200/300' alt={props.speciesCode}/>
  }

  if (props.speciesCode) {
    requestPhotoFromState(props.speciesCode)
    return <img src='http://placekitten.com/200/300' alt={props.speciesCode}/>
  }

  if (props.speciesName) {
    return (
      <div className="bird-thumbnail" >
        <h4>{photoData.title}</h4>
        <img alt={photoData.title} src = {`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`}/>
      </div>    
    )
  }

  return (
    <img src="" alt="bird foto" />
  )
}
export default BirdPhoto
