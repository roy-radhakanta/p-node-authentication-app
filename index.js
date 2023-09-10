const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-stategy');
const MongoStore = require('connect-mongo');


app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static('./assets'));

app.use(expressLayouts);
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);



app.set('view engine', 'ejs');
app.set('views', './views');

app.use(session({
    name: "social-auth",
    secret: "secretkey",
    saveUninitialized: false,
    resave: false,
    cookie: {
         maxAge:(1000*60*100)
    },
	store: MongoStore.create({
		mongoUrl: "mongodb+srv://radhakantaroydev:uPHiIFzV9bM77TzL@cluster0.xuqscfk.mongodb.net/?retryWrites=true&w=majority",
		autoRemove: 'disabled'
	})
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));

app.listen(PORT, function(err){
    if(err) console.log("Error PORT: ", err);
    console.log("App is running on PORT:", PORT);
})