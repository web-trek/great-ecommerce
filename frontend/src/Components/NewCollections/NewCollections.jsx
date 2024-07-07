import React, { useEffect, useState } from 'react'
import './NewCollection.css'
// import new_collections from '../Assets/new_collections'
import Item from '../Items/Item'

const NewCollections = () => {

  const [new_collections, setNew_collections] = useState([])

  useEffect(()=>{
    fetch('http://localhost:4000/api/new-collection').then((response)=>response.json()).then((data)=>setNew_collections(data))
  },[])

  return (
    <div className='new_collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collection_items">
        {
            new_collections.map((item, i)=>{
                return <Item className='item' key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
            })
        }
      </div>
    </div>
  )
}

export default NewCollections
