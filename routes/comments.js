var express =  require("express");
var router = express.Router();
var Pic = require("../modules/Data");
var User = require("../modules/users");



router.post("/comments/:id",islogedin,function(req,res){
    var comment = req.body.comment;
    var author = req.body.author;
    var id= req.params.id;
    Pic.findOne({_id:id},function(err,p){
        if(err){
            res.send("error");
        }else{
            
            p.comments.push({comment:comment,author: req.user.username});
            p.save();
            res.redirect("/pic/"+id);
        }
    })
    
})

/// user interface///
// edit button //
router.get("/:id/edit",usersafetypic,function(req,res){
    Pic.findOne({_id:req.params.id},function(err,detail){
        res.render("edit",{data : detail});

    })
    
})
//put router for edit:
//update pic;

router.put("/:id/edit",usersafetypic,function(req,res){
    var detail = {name : req.body.new_name,url : req.body.new_url,description : req.body.description}
    Pic.findByIdAndUpdate(req.params.id,detail,function(err,update){
        if(err)
        {
             res.send("error");
             console.log(err);
        }
        else{
            res.redirect("/pic/" + req.params.id);
        }
    })
})

router.delete("/:id/delete",usersafetypic,function(req,res){
    Pic.findByIdAndDelete(req.params.id,function(err,deleted){
        if(err)
        {
            res.send("error");
        }
        else{
            res.redirect("/");

        }
    })
})

//delete comment 

router.delete("/comments/:id/:id2/delete",usersafety,function(req,res){
       Pic.findOne({_id:req.params.id},function(err,p){
        if(err){
            console.log(err);
            res.send("error deleting");
        }
        else{

            p.comments.pull({_id : req.params.id2});
            p.save();
            res.redirect("/pic/"+req.params.id);
        }
       })
})

 //middle ware for comment delete
 function usersafety (req,res,next){
    if(req.isAuthenticated())
    {
        Pic.findById(req.params.id,function(err,p){
            var idf = p.comments.id(req.params.id2);
            var usercomments = idf.author;
            if(err){
                console.log(err);
                res.redirect("/")
            }

            if(p.username == req.user.username || usercomments == req.user.username)
            {
                next();
            }
            else {
                res.redirect("/");
            }
        })
    }
}
//middle ware for pic delete
function usersafetypic (req,res,next){
    if(req.isAuthenticated())
    {
        Pic.findById(req.params.id,function(err,p){
            if(err){
                console.log(err);
                res.redirect("/")
            }

            if(p.username == req.user.username )
            {
                next();
            }
            else {
                res.redirect("/");
            }
        })
    }
}
//middleWare

function islogedin(req,res,next){
      
    if(req.isAuthenticated())
    {
        return next();    
    }
    res.redirect("/Login");
}

module.exports = router;