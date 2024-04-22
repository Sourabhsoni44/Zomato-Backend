const express = require("express");
const mongoose = require('mongoose');
let restroRoutes= require('./routes/restaurant')
let productRoutes= require('./routes/products')
const userRoutes = require('./routes/user');
const loginRoutes = require("./routes/login");
const ratingRoutes = require("./routes/Rating");
const paymentRoutes = require("./routes/payment");
const cors = require('cors');

mongoose.connect("mongodb://127.0.0.1:27017/zomatofsd5",{
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });
const app = express();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use('/', userRoutes);
app.use("/", loginRoutes);
app.use('/', restroRoutes)
app.use('/', productRoutes)
app.use('/', ratingRoutes)
app.use('/', paymentRoutes)

let port=7000

app.listen(port,()=>{
    console.log(`server running on ${port}`)
})