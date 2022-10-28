var express = require('express');
var app = express();
var bodyParser = require('body-parser');
const cors = require('cors');
var mongoose = require('mongoose');
var multer = require('multer');
var csv = require('csvtojson');

require('dotenv/config');

var upload = multer({ dest: 'uploads/' });
const UserModel = require('./model');


app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', async (req, res) => {
    const users = await UserModel.find();
    res.json({ users });
});

app.post('/', upload.single('file'),  (req, res, next) => {
    console.log('req.file.path: ', req.file.path);
    csv()
    .fromFile(req.file.path)
    .then( async (jsonObj)=>{
        console.log('jsonObj: ', jsonObj);
        //write query to insert csv data in database.
        await UserModel.insertMany(jsonObj);

        res.json({message : "File uploaded successfully.", users: jsonObj});
        
    }).catch((error) => {
        res.status(500).send({
            message: "failure",
            error
        });
    })
});

console.log('process.env.MONGODB_URI: ', process.env.MONGODB_URI);
mongoose.connect(process.env.MONGODB_URI,
{ useNewUrlParser: true, useUnifiedTopology: true }, err => {
    console.log('err: ', err);
    console.log('Connected to database!')
});

app.listen('3000' || process.env.PORT, err => {
    if (err)
        throw err
    console.log('Server started!')
});
