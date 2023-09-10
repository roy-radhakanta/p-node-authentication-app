const User = require('../models/user');

module.exports.profile=function(req, res){
    return res.render('users_profiles', {
        title: "Profile"
    });
}

module.exports.signup = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	
    return res.render('users_signup', {
        title: "Signup"
    });
}

module.exports.signin = function(req, res){
	if(req.isAuthenticated()){
		return res.redirect('/users/profile');
	}
	
    return res.render('users_signin', {
        title: "Signin"
    });
}

module.exports.destroysession = function(req, res){
	req.logOut(function(err){
		if(err){console.log(err); return;}
		return res.redirect('/');
	});	
}

module.exports.create = async function(req, res){
    if(!req?.body?.password){
        return res.redirect('back');
    }
    const userFound = await User.findOne({email: req.body.email});
    if(!userFound){
        const userCreated = await User.create(req.body);
        if(userCreated){
            return res.redirect('/users/signin');
        }
        return res.redirect('back');
    }else{
        return res.redirect('back');
    }
}

module.exports.createSession = async function(req, res){
    return res.redirect('/');
}