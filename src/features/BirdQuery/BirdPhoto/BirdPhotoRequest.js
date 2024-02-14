import React, { useState, useEffect } from "react";
import { Image } from "react-bootstrap"
import { createFlickr } from "flickr-sdk"

const BirdPhoto = ({comName}) => {

  const [photoData, setPhotoData] = useState([])
  const [isLoading, setLoading] = useState(true);

  const { flickr } = createFlickr("c0df50748c11abc7c7ef61b7d9a5aab3")
  
  useEffect(() => {
    const retrievePhotos = async () => { 
      try {
          var res = await flickr("flickr.photos.search", {
            text: comName,
            media: "photos",
            per_page: 1,
            page: 1,
            extras: true
        })
  
        setPhotoData(res.photos.photo[0])
        setLoading(false);

        // console.log(res.photos.photo[0]) 

        } catch (error) {
            console.error(error) // from creation or business logic
        }
    }
    retrievePhotos()},[])
    //use a loading image here
    if(isLoading) { return <div> Loading ... </div> }

  return (
    <div className="bird-thumbnail" >
        <Image src = {`https://live.staticflickr.com/${photoData.server}/${photoData.id}_${photoData.secret}.jpg`}/>
    </div>
  )
}

export default BirdPhoto