const Product = require('../model/ProductModel')
const User = require('../model/UserModel')

// Creating API Controller to Add Product

const addProduct = async (req,res)=>{
    const {name, image} = req.body;
    if(!name | !image){
        throw new Error('Please Fill the Input');
    }

    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1
    }else {
        id = 1;
    }
    const product = new Product({
        id: id, 
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
    })
    // console.log(product)
    await product.save();
    // console.log('saved');
    res.json({
        success: true,
        name: req.body.id,
    })
}

// Creating API Controller to Delete Product

const RemoveProducts = async (req,res) => {
    await Product.findOneAndDelete({id:req.body.id});
    // console.log("Removed")
    res.json({
        success:true,
        name:req.body.name,
    })
}

// Creating API Controller for getting all products

const GetAllProducts = async (req, res) => {
    let products = await Product.find({});
    // console.log("All Products Fetched")
    res.send(products);
}

// Creating API for New Collection Data

const NewCollection = async (req, res) => {
    let product = await Product.find({});
    let newCollectionProducts = await product.slice(1).slice(-8);
    console.log('new collection fetched')
    res.send(newCollectionProducts);
}

// Creating API for New Collection Data

const PopularCollection = async (req, res) => {
    let product = await Product.find({category: 'women'});
    let popular_in_women = product.slice(0,4);
    console.log('popular in women fetched')
    res.send(popular_in_women);
}

// Creating API for Adding Products from CartData DB
const addToCart = async (req,res) => {
    console.log('Added', req.body.itemId);
    let userData = await User.findOne({_id: req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
    res.send({success: true, message: 'Added Successful'})
}

// Creating API for Removing Products from Cartdata DB
const removeFromCart = async (req,res) => {
    console.log('Removed', req.body.itemId);
    const itemId = req.body.itemId;
    let userData = await User.findOne({_id: req.user.id});
    if(userData.cartData[itemId]>0)
        userData.cartData[req.body.itemId] -= 1;
        await User.findOneAndUpdate({_id: req.user.id}, {cartData: userData.cartData});
        res.send({success: true, message: 'Removed Succesfully'})
}

// Creating API for Get Cart Data When User Login Each Time
const getCartData = async (req,res) => {
    console.log('Get Cart Data')
    let userData = await User.findOne({_id: req.user.id});
    res.json(userData.cartData);
}


module.exports = {addProduct, RemoveProducts, GetAllProducts, NewCollection, PopularCollection, addToCart, removeFromCart, getCartData}