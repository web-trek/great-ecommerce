const {Router} = require('express')
const { addProduct, RemoveProducts, GetAllProducts, NewCollection, PopularCollection, addToCart, removeFromCart, getCartData } = require('../controllers/ProductController')
// const {fetchUser} = require('../middleware/middleware')

const jwt = require('jsonwebtoken')

const router = Router()

// Creating API to Add Products
router.post('/addproduct', addProduct)

// Creating API to Delete Product
router.post('/removeproduct', RemoveProducts)

// Creating API to Delete Product
router.get('/allproducts', GetAllProducts)

// Creating API to fetch New Collection's Product
router.get('/new-collection', NewCollection)

// Creating API for Popular in Popular Women's Products
router.get('/popular-in-women', PopularCollection)

const fetchUser = async (req, res, next) => {
    const token = req.header('auth-token');
    if(!token){
        res.status(401).send({success: false, message: 'Token not available'})
    }else {
        try {
            const data = await jwt.verify(token, 'secret_ecom');
            req.user = data.user;
            next();
        } catch (err){
            res.status(401).send({success: false, message: 'Please Authenticate with Valid Token'})
        }
    }
}
// Creating API for Popular in Popular Women's Products
router.post('/addtocart', fetchUser, addToCart)

// Creating API for Popular in Popular Women's Products
router.post('/removefromcart', fetchUser, removeFromCart)

// Creating API for Popular in Popular Women's Products
router.post('/getcart', fetchUser, getCartData)


module.exports = router