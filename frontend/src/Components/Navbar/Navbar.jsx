import './Navbar.css'
import React, { useContext, useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import Logo from '../Assets/logo.png'
import { FaCartShopping } from "react-icons/fa6";
import { ShopContext } from '../../Context/ShopContext';


const Navbar = () => {
    const [menu, setMenu] = useState('shop')
    const {getTotalCartItems} = useContext(ShopContext)
    const navigate = useNavigate();

  return (
    <div className='navbar fixed right-0 left-0 bg-white shadow-md'>
      <Link to='/'>
        <div className="nav-logo">
          <img src={Logo} alt="" />
          <p>SHOPPER</p>
        </div>
      </Link>
      <ul className="nav-menu">
        <li onClick={() => {setMenu('shop')}}><Link to='/'>Shop</Link>{menu==='shop' && <hr />}</li>
        <li onClick={() => {setMenu('mens')}}><Link to='/mens'>Mens</Link>{menu==='mens' && <hr />}</li>
        <li onClick={() => {setMenu('womens')}}><Link to='/womens'>Womens</Link>{menu==='womens' && <hr />}</li>
        <li onClick={() => {setMenu('kids')}}><Link to='/kids'>Kids</Link>{menu==='kids' && <hr />}</li>
      </ul>
      <div className="nav-login-cart flex items-center gap-5">
        <Link to='/login'>
        {localStorage.getItem('auth-token') ?
          <button onClick={()=>{localStorage.removeItem('auth-token'); navigate('/')}} className=' w-24 py-2 border border-slate-500 rounded-xl bg-white text-slate-500 text-md active:bg-slate-200'>Logout</button>
        : <button className=' w-24 py-2 border border-slate-500 rounded-xl bg-white text-slate-500 text-md active:bg-slate-200'>Login</button> }
        </Link>

        <Link to='/cart'>
          <div className="cart relative">
              <FaCartShopping className=' text-lg'/>
              <div className="nav-cart-count absolute ">{getTotalCartItems()}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
