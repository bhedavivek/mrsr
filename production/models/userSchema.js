var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Name = new Schema(
    {
        first_name : {
            type : String,
            required : true
        },
        last_name  : {
            type : String,
            required: true
        },
        middle_name : {
            type : String 
        },
        suffix : {
            type : String
        },
        prefix : {
            type : String
        }
    }
);
var Address = new Schema({
    address : {
      type : String,
      required : true  
    },
   city : {
       type : String,
       required : true
   },
   state : {
       type : String,
       required : true,
   },
   zipcode : {
       type : Number,
       required : true
   },
   country : {
       type : String,
       required : true
   }
});
var users = new Schema(
    {
        type : {
            type : String,
            enum : ['user', 'institution','doctor', 'admin']
        },
        user_aadhar_number : {
            type : Number,
            required : true,
            unique : true
        },
        user_password : {
            type : String,
            required : true
        },
        doctor_registration_id : {
            type : String,
            unique : true
        },
        doctor_password : {
            type : String
        },
        admin_id : {
            type : String,
            unique : true
        },
        admin_password : {
            type : String
        },
        user_email : {
            type : String,
            required : true,
            unique : true
        },
        name : {
            type : Name,
            required : true
        },
        address : {
            type : Address,
            required : true
        },
        dob : {
            type : Date,
            required : true
        },
        
    }
);
module.exports = users;