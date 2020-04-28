var express = require("express");
var app = express();
var request = require("request");
var router =express.Router();
var bodyparser = require("body-parser");
var mongoose = require("mongoose");
var methodOverRide = require("method-override");
var passport = require("passport");
var localStratag = require("passport-local");
var userOnline;
var passportLocalMongoose = require("passport-local-mongoose");
var commentRoutes = require("./routes/comments");
var PicRoutes =require("./routes/Pic");
var indexRoutes =require("./routes/index");
//mongoose.connect("mongodb://localhost/yelpcamp",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect("mongodb+srv://rohith:rohith@cluster0-knggx.gcp.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true,useUnifiedTopology:true})
Pic = require("./modules/Data");
User = require("./modules/users");
app.use(bodyparser.urlencoded({ extended:true}));
app.use(express.static("public"));
app.set("view engine","ejs");
app.use(methodOverRide("_method"));
app.use(require("express-session")({
    secret: "rohith",
    resave: false,
    saveUninitialized : false
}))

//for findByIdAndUpdate :------ mongoose.set('useFindAndModify', false);
mongoose.set('useFindAndModify', false);
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStratag(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(router);
app.use(PicRoutes);
app.use(indexRoutes);
app.use(commentRoutes);
var port = process.env.port || 8080;
app.listen(port,function(){
    console.log("server started");
    console.log(port);
})