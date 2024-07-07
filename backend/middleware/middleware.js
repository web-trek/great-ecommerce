const jwt = require('jsonwebtoken')


// create middleware to extract user id from token

// const fetchUser = async (req,res,next) => {
//     let token = req.headers('auth-token');
//     if(!token){
//         res.status(401).send({success: false, message: 'Please with Valid Token'})
//     }else {
//         try {
//             const data = await jwt.verify(token, 'secret_ecom');
//             req.user = data.user;
//             next();
//         } catch (error) {
//             res.status(401).send({success: false, message: 'Please Authenticate with Valid Token'})
//         }
//     }
// }

module.exports = {fetchUser};