import React, {createContext, useEffect, useState} from "react";
// import all_products from '../Components/Assets/all_product'

export  const ShopContext = createContext(null);

const getDefaultCart = () => {
    let cart = {}
    for (let index = 0; index < 300+1; index++) {
        cart[index] = 0
    }
    return cart
}

const ShopContextProvider = (props) => {

    const [all_products, setAllproducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());

    // storing our all products from database into all_products state vaiable;
    useEffect(()=>{
        fetch('http://localhost:4000/api/allproducts')
        .then((response)=>response.json())
        .then((data)=>setAllproducts(data));

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/getcart', {
                method: 'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body: '',
            }).then((response)=>response.json()).then((data)=>setCartItems(data));
        }
    },[])

    const addToCart = (itemId) => {
        setCartItems((prev)=>
            ({...prev,[itemId]:prev[itemId]+1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/addtocart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'itemId': itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
        
    };

    // console.log(cartItems);
    const removeFromCart = (itemId) => {
        setCartItems((prev)=>
            ({...prev, [itemId]:prev[itemId]-1}));
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/removefromcart',{
                method: 'POST',
                headers: {
                    Accept: 'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({'itemId': itemId})
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data))
        }
    }

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

    const getTotalCartItems = () =>{
        let totalItem = 0;
        for(const item in cartItems){
            if(cartItems[item]>0){
                totalItem += cartItems[item]
            }
        }
        return totalItem;
    }

    const contextValue =  {getTotalCartItems, getTotalCartAmount, all_products, cartItems, addToCart, removeFromCart};


    return(
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider