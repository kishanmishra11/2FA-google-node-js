const express = require('express')
const connection = require('./db/conn');
const bodyParser = require('body-parser')
const cors = require('cors')
const qrcode = require('qrcode')
const userModel = require('./model/userModel')
const app = express()
const {authenticator} = require('otplib')
const port = 3000;

app.use(bodyParser.json());app.use(bodyParser.urlencoded({extended:true}));
app.use(cors({ origin: '*' }));

const userRoute = require('./route/userRoute');

app.use(userRoute);

app.listen(3000,()=>{
    console.log(`connection is established on port number ${port}`);
})