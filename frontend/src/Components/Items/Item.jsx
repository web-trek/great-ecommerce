import React from 'react'
import './Item.css'
import { Link } from 'react-router-dom'

const Item = (props) => {
  return (
    <div className='items'>
      <div className="img_box">
        <Link to={`/product/${props.id}`}><img onClick={window.scroll(0,0)} src={props.image} alt="" /> </Link>
      </div>
      <p>{props.name}</p>
      <div className="item_prices">
        <div className="item_new_price">
            $ {props.new_price}
        </div>
        <div className="item_old_price">
            $ {props.old_price}
        </div>
      </div>
    </div>
  )
}

export default Item
