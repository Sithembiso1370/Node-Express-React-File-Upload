const express = require('express')
const expressfileUpload = require("express-fileupload");
const cors = require('cors')

// Create an instance of the app
const app = express();
// store the PORT Value in a variable
const PORT = process.env.PORT || 5000;

// Configure middlewares
app.use(cors());
// middleware to handle json data recieved instead of body parser
app.use(express.json())


app.listen(PORT,(req,res)=>{
    console.log(`Server running on PORT : ${PORT}`)
});