const port = process.env.PORT | 4000;

const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const path = require('path')
const cors = require('cors')

const ProductRoutes = require('./routes/ProductRoutes')
const UserRoutes = require('./routes/UserRoutes')

app.use(express.json())
app.use(cors())

// Database Connection With MongoDB

mongoose.connect("mongodb+srv://erehuchiha00:yOl9l0ExSfYcqYZd@uzumaki-cluster.v1raly0.mongodb.net/great-commerce")

// API Creation

app.get("/", (req,res) => {
    res.send('Express App is Running')
})

// Image Storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const upload = multer({storage: storage})

// Creating Upload Endpoints for Images
app.use('/images', express.static('upload/images'))
app.post("/upload", upload.single('product'), (req,res)=>{
    res.json({
        success:1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

app.use('/api', ProductRoutes)
app.use('/api', UserRoutes)

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Running On Port"+port)
    }else {
        console.log("Error : "+error)
    }
})