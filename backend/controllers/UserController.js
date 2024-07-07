const User = require('../model/UserModel')
const jwt = require('jsonwebtoken')



// signup controller
const SignUp = async (req, res) => {
    
    const {email, name, password} = req.body;
    if(!email || !name || !password){
        return res.status(400).json({success:false, message:"Please Fill the Form"})
    }

    let check = await User.findOne({email:email})
    if(check){
        // throw new Error('Email Already Exist')
        return res.status(400).json({success:false, message:"Email Already Exists"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new User({
        name: name,
        email: email,
        password: password,
        cartData: cart,
    })
    await user.save();

    // generating token
    const data = {
        user: {
            id: user._id,
        }
    }
    const token = jwt.sign(data, 'secret_ecom');
    res.json({success: true, token, message: 'User Signup Successfully'})

}

// Creating Endpoint For User Login

const Login = async (req, res) => {

    const {email, password} = req.body;
    if(!email || !password){
        return res.json({success:false, message:"Please Fill the Form"})
    }

    let user = await User.findOne({email: req.body.email})

    if(user){
        const passCompare = await req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id: user._id,
                }
            }
            const token = jwt.sign(data, 'secret_ecom')
            res.json({success: true, token, message: 'User Logged in Successfully'})
        }else{
            res.json({success: false, message: 'Wrong Password'})
        }
    }else{
        return res.status(400).json({success:false, message:"User not found"})
    }

}

module.exports = { SignUp, Login }