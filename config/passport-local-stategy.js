const passport = require('passport');
const LocalStategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use(new LocalStategy(
    {
        usernameField: 'email',
    },
    async function(email, password, done){
        const user = await User.findOne({email:email});

        if(!user){
            console.log("user not found");
            return done(user);
        }
        if(user.password!=password){
            console.log("Password not matched");
            return done(null, false);
        }
        return done(null, user);
    }
));

passport.serializeUser(function(user, done){
    done(null, user.id);
});

passport.deserializeUser(async function(id, done){
    const user = await User.findById(id);
    if(!user){
        console.log("user not found");
        return done(user);
    }
    return done(null, user);
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    }
    return res.redirect('/users/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    if(req.isAuthenticated()){
		res.locals.user = req.user;	
    }
	return next();
}







module.exports = passport;