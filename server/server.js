const express = require('express');
const expressfileUpload = require("express-fileupload");
const cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require("path");
const fs = require('fs')

// Create an instance of the app
const app = express();
// store the PORT Value in a variable
const PORT = process.env.PORT || 5000;

// Configure middlewares
app.use(cors());
// middleware to handle json data recieved instead of body parser
app.use(express.json());
// middleware attached to file upload framework
// app.use(fileUpload());
// Note that this option available for versions 1.0.0 and newer. 
app.use(fileUpload({
    // useTempFiles : true,
    // tempFileDir : '/tmp/',
    // debug: true,
    // createParentPath: true
}));


// CONFIGURE ROUTES
app.get('/', (req,res) => {
    res.status(200).send("server up and running")
});

app.post('/upload', function(req, res) {
    // Your input's name field is foo: <input name="foo" type="file" />
    console.log("Uploaded file : ",req.files.foo); // the uploaded file object
    const file = req.files.foo;
    const newDir = __dirname + '/uploads/'+file.name;
    const newDirFileExisted = __dirname + '/uploads/'+file.name+(Math.random() * (1000 - 1) + 220);

    // Check if no similar file has been uploaded
    if (fs.existsSync(newDir)) {
        //file exists
        console.log("This file has already been downloaded before");
        // if file exists already rename the file and save it
        fs.rename(newDir, newDirFileExisted, function (err) {
            if (err) throw err;
            console.log('File Renamed to : ',newDirFileExisted);
          });
        // Try to move the uploaded file again
        // move the uploaded file elsewere and rename
        file.mv(newDirFileExisted ,(err)=>{
            if (err)
            return res.status(500).send(err);
    
        res.send('File uploaded!');
        });
    }
    else{
        // move the uploaded file elsewere
        file.mv(newDir ,(err)=>{
            if (err)
            return res.status(500).send(err);
    
        res.send('File uploaded!');
        });
    }

  });


console.log("dirname = ",path.join(__dirname,'uploads'))
app.listen(PORT,(req,res)=>{
    console.log(`Server running on PORT : ${PORT}`)
});