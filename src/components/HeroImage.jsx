import LazyHero from 'react-lazy-hero';
import React from 'react';
import { Header, Segment} from 'semantic-ui-react'
import image from '../images/jhYV6A.jpg'
const square = {width: 225, height: 225}

const Hero = () => {
  return (
    <LazyHero imageSrc={image} style={{ marginTop: '-15px', opacity: 1, minHeight: '85vh'}}>
      <Segment circular style ={square}>
        <Header disabled>GET YOUR BASIC NEEDS AND SHOPPING TAKEN CARE OF FROM THE COMFORT OF YOUR HOME</Header>
      </Segment>
    </LazyHero>
  );
}

export default Hero