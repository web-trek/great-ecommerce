import React, { useState } from 'react'
import './AddProduct.css'
import upload_area from '../../assets/upload_area.svg'
import { toast } from "react-toastify";

const AddProduct = () => {
  const [image, setImage] = useState(false)
  const [productDetails, setProductDetails] = useState({
    name: "",
    image: "",
    category: "women",
    new_price: "",
    old_price: ""
  })

  const imageHandler = (e)=> {
    setImage(e.target.files[0]);
  }

  const changeHandler = (e)=>{
    setProductDetails({...productDetails, [e.target.name]:e.target.value})
  }

  const Add_Products = async () => {
    // console.log(productDetails)
    let responseData;
    let product = productDetails;
    let message;

    let formData = new FormData();
    formData.append('product', image)

    await fetch('http://localhost:4000/upload', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
      },
      body: formData,
    }).then((resp) => resp.json()).then((data) => {responseData=data})

    if(responseData.success){
      product.image = responseData.image_url;
      // console.log(product)
      await fetch('http://localhost:4000/api/addproduct', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
      }).then((resp)=>resp.json()).then((data)=>{
        // data.success?alert('product added succesfully') : alert('Failed')
        data.success?toast.success('Product Added Successfull'):toast.error('Failed to Product')
      })
    }

  }

  return (
    <div className='add_product'>
      <div className="add_product_item_feild">
        <p>Product Title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='Type here...' />
      </div>
      <div className="add_product_price">
        <div className="add_product_item_feild">
          <p>Price</p>
          <input value={productDetails.old_price} onChange={changeHandler} type="text" name='old_price' placeholder='TypeHere...' />
        </div>
        <div className="add_product_item_feild">
          <p>Offer Price</p>
          <input value={productDetails.new_price} onChange={changeHandler} type="text" name='new_price' placeholder='TypeHere...' />
        </div>
      </div>
      <div className="add_product_item_feild">
        <p>Product Category</p>
        <select value={productDetails.category} onChange={changeHandler} name="category" id="" className='add_product_selector'>
          <option value="men">Mens</option>
          <option value="women">Womens</option>
          <option value="kid">Kids</option>
        </select>
      </div>
      <div className="add_product_itemfeild">
        <label htmlFor="file-input">
          <img src={image?URL.createObjectURL(image) : upload_area} className='add_product_thumbnail_img' alt="" />
        </label>
        <input onChange={imageHandler} type="file" name='image' id='file-input' hidden />
      </div>
      <button onClick={()=>{Add_Products()}} className='add_product_btn'>ADD PRODUCT</button>
    </div>
  )
}

export default AddProduct
