const express = require('express');
const mongoose = require('mongoose');
const methodOveride = require('method-override');
const fileUpload = require('express-fileupload');
const expresslayout = require('express-ejs-layouts');
const app = express();


const port = 3000;

const routes = require('./routers/blog-routes');
const { urlencoded } = require('express');
// express layout
app.use(expresslayout);
app.set('layout', './layouts/main-layout');
app.set('view engine','ejs');

const dbURI = 'enter your connection string'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
.then(()=>{
  app.listen(port, () => {
    console.log(`server running on port ${port}`);
  });
})


.catch((err)=>{
  console.log(err)
})
//use express.urlencoded to grab form values
app.use(express.urlencoded({extended:true}));

//use method overide
app.use(methodOveride('_method'));

// use fileUpload
app.use(fileUpload());

//use public folder
app.use(express.static('public'));

//use blog routes
app.use(routes);

//render 404 page
app.use((req,res)=>{
    res.status(404).render('404', {title: 'error-page'})
})
