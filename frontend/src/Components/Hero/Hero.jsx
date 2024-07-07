import React from 'react'
import './Hero.css'
import hand_icon from '../Assets/hand_icon.png'
import arrow_icon from '../Assets/arrow.png'
import hero_image from '../Assets/hero_image.png'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="hero_left">
        <h2>NEW ARRIVALS ONLY</h2>
        <div className="hand_icons">
            <p>new</p>
            <img src={hand_icon} alt="" />
        </div>
        <p>collections</p>
        <p>for everyone</p>
        <div className="hero_latest_btn">
            <div>Latest Collection</div>
            <img src={arrow_icon} alt="" />
        </div>
      </div>
      
      <div className="hero_right w-full">
        <img src={hero_image} className='h-full' alt="" />
      </div>
    </div>
  )
}

export default Hero
