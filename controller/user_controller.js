const User = require('../models/user');

module.exports.profile=function(req, res){
    return res.render('users_profiles', {
        title: "Profile"
    });
}
module.exports.signup = function(req, res){
    return res.render('users_signup', {
        title: "Signup"
    });
}
module.exports.signin = function(req, res){
    return res.render('users_signin', {
        title: "Signin"
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
};