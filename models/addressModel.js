const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema ({

    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User",
        required : true
    },
     name : String,
     street : String,
     city : String,
     state : String,
     pincode : Number,
     phone : Number
} ,{timestamps:true});
module.exports = mongoose.model ("Address", addressSchema);