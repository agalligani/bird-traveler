const ImageGallery = (props) => {

   const imgs = props.imageArray.map(
    img => {
      return (    
      <li>
        <img src="https://source.unsplash.com/VWcPlbHglYc/640x416" alt="" />
          <div class="overlay"><span>Image title</span></div>
      </li>
      )
    })


  
  return (
<div class="gallery-container">
<h2 class="heading-text"><span></span></h2>
<ul class="image-gallery">
    {imgs}
</ul>
</div>  
)
}


export default ImageGallery