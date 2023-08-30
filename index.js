const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use('/', require('./routes'));

app.set('view engine', 'ejs');
app.set('views', './views')

app.listen(PORT, function(err){
    if(err) console.log("Error PORT: ", err);
    console.log("App is running on PORT:", PORT);
})