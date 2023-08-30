const User = require('../models/user');

module.exports.profile= async function(req, res){
    if(!req.cookies.user_id){
        return res.redirect('/users/signin');
    }
    const user = await User.findById({_id: req.cookies.user_id});
    if(!user){
        return res.redirect('/users/signin');
    }
    return res.render('users_profiles', {
        title: "Profile",
        user: user
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
}
module.exports.createSession = async function(req, res){
    const user = await User.findOne({email: req.body.email});
    if(!user){
        return res.redirect('back');
    }
    if(user.password != req.body.password){
        return res.redirect('back');
    }
    res.cookie('user_id', user.id);
    return res.redirect('/users/profile');
}