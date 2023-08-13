const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const UserSchema = new Schema({
    googleId :{
        type : String ,
        required : true
    },
    displayName :{
        type : String ,
        required : true
    },
    firstname :{
        type : String ,
        required : true
    },
    lastname :{
        type : String ,
        required : true
    },
    profileImage :{
        type : String ,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
      }
});

module.exports = mongoose.model('User',UserSchema);