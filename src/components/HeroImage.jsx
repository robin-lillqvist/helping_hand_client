import LazyHero from 'react-lazy-hero';
import React from 'react';
import { Header, Segment} from 'semantic-ui-react'

const square = {width: 225, height: 225}

const Hero = () => {
  return (
    <LazyHero imageSrc="https://cdn.hipwallpaper.com/i/35/78/jhYV6A.jpg" style={{ marginTop: '-15px', opacity: 1, minHeight: '85vh'}}>
      <Segment circular style ={square}>
        <Header disabled>GET YOUR BASIC NEEDS AND SHOPPING TAKEN CARE OF FROM THE COMFORT OF YOUR HOME</Header>
      </Segment>
    </LazyHero>
  );
}

export default Hero