const {Router} = require('express')
const {SignUp, Login} = require('../controllers/UserController')

const router = Router()

// Creating API for user signup
router.post('/signup', SignUp)

// Creating API for user signup
router.post('/login', Login) 

module.exports = router;