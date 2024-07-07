import React, { useEffect, useState } from 'react'
import './ListProducts.css'
import cross_icon from '../../assets/cross_icon.png'

const ListProducts = () => {

  const [allproducts, setAllproducts] = useState([]);

  const fetchinfo = async ()=>{
    await fetch('http://localhost:4000/api/allproducts').then((res)=>res.json()).then((data)=>{setAllproducts(data)});
  }

  useEffect(()=>{
    fetchinfo();
  },[])

  const removeProduct = async (id) => {
    await fetch('http://localhost:4000/api/removeproduct', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({id:id})
    })
    await fetchinfo();
  }

  return (
    <div>
      <div className="listproducts">
        <h1>All Products List</h1>
        <div className="listproduct_format_main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct_allproducts">
          <hr />
          {
            allproducts.map((product,index)=>{
              return <><div key={index} className="listproduct_format_main listproduct_item">
                <img src={product.image} alt="" className="listproduct_product_icon" />
                <p>{product.name}</p>
                <p>${product.old_price}</p>
                <p>${product.new_price}</p>
                <p>{product.category}</p>
                <img onClick={()=>{removeProduct(product.id)}} src={cross_icon} className='listproduct_product_remove_icon' alt="" />
              </div>
              <hr /></>
            })
          }
        </div>
      </div>
    </div>
  )
}

export default ListProducts
