var express =  require("express");
var router = express.Router();
var Pic = require("../modules/Data");

router.post("/new",islogedin,function(req,res){
    var name = req.body.new_name;
    var  url =req.body.new_url;
    var description = req.body.description;
    var user1 = req.user.username;
    var toappend={name:name,url:url,description:description,username : user1 };
    Pic.create(toappend,function(err,pic){
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.redirect("/");
        }
    })
   
})

router.get("/new",islogedin,function(req,res){
    userOnline = req.user;
    res.render("new",{currentUser: req.user});
})
router.get("/pic/:id",function(req,res){
     Pic.find({_id : req.params.id},function(err,detail){
         if(err){
             console.log(err);
         }
         else
         {
             res.render("More_info",{data:detail, currentUser: req.user});
         }
     })
     
})

//middleWare

function islogedin(req,res,next){
      
    if(req.isAuthenticated())
    {
        return next();    
    }
    res.redirect("/Login");
}

module.exports = router;
