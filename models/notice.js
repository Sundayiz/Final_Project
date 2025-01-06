const mongoose = require("mongoose");
const noticeSchema = new mongoose.Schema({
    title:{type:String,required:true},
    description:{type:String,required:true},
    date: {type:Date,default:Date.now},
    school:{type:mongoose.Schema.Types.ObjectId, ref:"school"},
    audience:{type:String,enum["all","parents","teachers","students"],default:"all"}
})
module.exports = mongoose.model("Notice",noticeSchema);