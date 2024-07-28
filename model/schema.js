const mongoose = require("mongoose");

const schema = new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            maxLength:50,
        },
        lastName:{
            type:String,
            required:true,
            maxLength:50,
        },
        email: {
            type:String,
            required:true,
        },
        password: {
            type:String,
            required:true,
        },
        confirmPassword: {
            type:String,
            required:true,
        },
        role: {
            type:String,
            enum:['admin', 'user','employee']
        }
    }
);

module.exports = mongoose.model("schema", schema);

// New Tendor-admin -> make tendor
//post,get,post,delete,update

// fill tendor-user
//get tendor details-getById
///post-to fill details -> tendor schema


// income tax-user
//get/post

// admin -> to see details of all income tax

// complaint-user->employee->admin
// get/post-user
// put-admin/emp