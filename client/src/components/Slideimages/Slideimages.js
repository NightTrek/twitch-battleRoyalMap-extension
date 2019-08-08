import React from 'react';
import Carousel from 'nuka-carousel';
import '../Slideimages/Slideimages.css';


export default class SlideImages extends React.Component {
  state = {
    slideIndex: 0
  };

  render() {
    return (
      <Carousel
        slideIndex={this.state.slideIndex}
        afterSlide={slideIndex => this.setState({ slideIndex })}
      >
        <img src={require('../Slideimages/apexlegends.jpg')} />       
        <img src={require('../Slideimages/battleground.jpg')} />
        <img src={require('../Slideimages/fortnite.jpg')} />
        <img src={require('../Slideimages/h1z1.jpg')} />
        <img src={require('../Slideimages/roe.jpg')} />
      </Carousel>
    );
  }
}