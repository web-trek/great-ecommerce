import React, { useEffect, useState } from 'react'
import './Popular.css'
// import data_product from '../Assets/data'
import Item from '../Items/Item'

const Popular = () => {

  const [popularWomen, setPopularWomen] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/api/popular-in-women').then((response)=>response.json()).then((data)=>setPopularWomen(data));
  },[])

  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="popular_items">
        {
            popularWomen.map((item) =>{
                return <Item key={item.id} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
        }
      </div>
    </div>
  )
}

export default Popular
