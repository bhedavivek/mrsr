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
var Contact = new Schema({
    primary : {
        type : String,
        required : true
    },
    secondary : {
        type : String
    }
});
var ReportToken = new Schema({
    report_id : {
        type : String,
        required : true
    },
    report_token : {
        type : String,
        required : true
    }
});
var users = new Schema(
    {
        usertype : {
            type : String,
            default : 'user'
        },
        user_aadhaar_id : {
            type : String,
            required : true,
            unique : true
        },
        user_password : {
            type : String,
            required : true
        },
        email : {
            type : String,
            required : true,
            unique : true
        },
        sex : {
            type : String,
            default : 'secret',
            enum : ['male', 'female', 'secret']  
        },
        contact_number : {
            type : Contact,
            required : true
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
        report_tokens : {
            type : [ReportToken],
        },
        verified : {
            type : Boolean,
            default : false,
            required : true
        }
    }
);
module.exports = users;