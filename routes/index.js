var express =  require("express");
var router = express.Router();
var passport = require("passport");
var localStratag = require("passport-local");
var User = require("../modules/users");

router.get("/",function(req,res){
    userOnline = req.user;
    Pic.find({},function(err,data1){
        if(err){
            console.log(err);
        }
        else{
            res.render("home",{data:data1,currentUser: req.user})
        }
    })
})





// Atuh routes:-----//

router.get("/register",function(req,res){
    res.render("register")
})
router.post("/register",function(req,res){
    User.register(new User ({username : req.body.username }),req.body.password,function(err,user){
        if(err)
        {
            console.log(err);
        }
        passport.authenticate('local')(req,res,function(){
            res.redirect("/");
        })

    });
});
//Login route:---//


router.get("/Login",function(req,res){
    res.render("login");
})
router.post("/Login",passport.authenticate("local",{successRedirect:"/",failureRedirect:"/Login"}),function(req,res){})


///Logout route:----//

router.get("/logout",function(req,res){
    req.logOut();
    res.redirect("/");
})

//log out done __________________

module.exports = router;