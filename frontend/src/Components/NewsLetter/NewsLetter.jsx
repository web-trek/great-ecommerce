import React from 'react'
import './NewsLetter.css'

const NewsLetter = () => {
  return (
    <div className='newsletter'>
      <h1>Get Exculusive Offers On Your Email</h1>
      <p>Subscribe to our Newsletter, and stay updated</p>
      <div className='boxx'>
        <input type="email" placeholder='Your Email Id' />
        <button>Subscribe</button>
      </div>
    </div>
  )
}

export default NewsLetter
