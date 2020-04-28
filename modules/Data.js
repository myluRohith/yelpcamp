var mongoose =require("mongoose");
var commentShema = new mongoose.Schema({
    comment: String,
    author: String
})
var DataShema = new mongoose.Schema({
    name : String,
    url : String,
    description : String,
    username: String,
    comments :[commentShema]
});
 module.exports = mongoose.model("pic",DataShema);