const mongoose = require("mongoose")

const commentSchema = new mongoose.Schema({
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    text:{
        type:String,
        required:true
    }
},{
    timestamps:true
})

const Comment = mongoose.model("comments",commentSchema)

module.exports = Comment