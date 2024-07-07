import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const {all_products, cartItems, removeFromCart} = useContext(ShopContext)

    
    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                let iteminfo = all_products.find((product)=>product.id===Number(item))
                totalAmount += iteminfo.new_price * cartItems[item]
            }
        }
        return totalAmount;
    }

  return (
    <div className='cartitems'>
      <div className="cartitems_format_main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {
        all_products.map((e)=>{
            if(cartItems[e.id] > 0){
                return <div className="">
                    <div className="cartitems_format cartitems_format_main">
                        <img src={e.image} className='carticon_product_icon' alt="" />
                        <p>{e.name}</p>
                        <p>${e.new_price}</p>
                        <button className='cartitems_quantity'>{cartItems[e.id]}</button>
                        <p>${e.new_price*cartItems[e.id]}</p>
                        <img className='cart_item_remove_icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
                    </div>
                    <hr />
                </div>
            }
            return null;
        })
      }
      <div className="cartitems_down">
        <div className="cartitems_total">
            <h1>Cart Total</h1>
            <div>
                <div className="cart_item_total_items">
                    <p>Subtotal</p>
                    <p>${getTotalCartAmount()}</p>
                </div>
                <hr />
                <div className="cart_item_total_items">
                    <p>Shopping Fee</p>
                    <p>Free</p>
                </div>
                <hr />
                <div className="cart_item_total_items">
                    <h3>Total</h3>
                    <h3><b>${getTotalCartAmount()}</b></h3>
                </div>
            </div>
            <button>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cartitems_promocode">
            <p>If you have a promo code, Enter it here</p>
            <div className="cartitems_promobox">
                <input type="text" placeholder='promo code' />
                <button>Submit</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default CartItems
