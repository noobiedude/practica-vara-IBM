import React from "react";
// import { ParallaxProvider , Parallax  } from "react-scroll-parallax";
import "./Home.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const photos = [
  {
    name: 'Photo 3',
    url: "https://res.cloudinary.com/practicaldev/image/fetch/s--WOoiZNyn--/c_imagga_scale,f_auto,fl_progressive,h_500,q_auto,w_1000/https://thepracticaldev.s3.amazonaws.com/i/4puntz4m5uid9vlg5ytg.png"},
  {
    name: 'Photo 1',
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlgdwVQgKQrHiFCdM6QEyRbRB_-12ISr88pw&usqp=CAU"
  },
  {
    name: 'Photo 2',
    url: "https://pbs.twimg.com/media/EgzY8-mVgAEREAZ.jpg"
  },
  
  {
    name: 'Photo 4',
    url: "https://i.pinimg.com/originals/c2/e2/67/c2e26700b40bf55efa8d0ac05977e5c0.jpg"
  },
  {
    name: 'Photo 5',
    url: "https://devhumor.com/content/uploads/images/August2020/Programming-Language-Comics---Funny-Coding-Comic.png"
  }
]

class Home extends React.Component {
 
    render(){
      const settings = {
        dots: true,
        fade: true,
        infinite: true,
        speed:500,
        slidesToShow:1,
        arrows:true,
        slidesToScroll:1,
        className:"slides"
      }
        
      return (
      <div className="App">
    <Slider {...settings}>
      {photos.map((photo) => {
        return(
          <div className="slider-body">
      
          <img className="slider-img"  src={photo.url} alt="" />
          </div>
        )
      })}
    </Slider>
    <br /><br />
    <a href="/addPost">click</a>
   </div>

     
    

      );
    }
    
  
}

export default Home;
