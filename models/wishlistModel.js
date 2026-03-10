const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref: "User",
        required : true
        },

    productId : {
type : mongoose.Schema.Types.ObjectId,
ref : "Product",
required : true
    }

}, {timestamp : true});

module.exports = mongoose.model("Wishllist", wishlistSchema);