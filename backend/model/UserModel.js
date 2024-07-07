const {Schema, model} = require('mongoose')

// Schema for Creating Products for MongoDB

const UserSchema = new Schema({
    // id:{type: Number, required: true },
    name:{type: String,},
    email:{type: String, },
    password:{type: String, },
    cartData:{type: Object, },
    date:{type: Date, default: Date.now},
})

module.exports = model('User', UserSchema)