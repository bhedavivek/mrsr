var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var Value = new Schema({
    type : {
        type : String,
        enum : ['String', 'Number', 'Date', 'Email'],
        required : true
    },
    value : {
        type : String,
        required : true
    },
    _id : false
});
var Name = new Schema({
    first_name : {
        type : String,
        required : true
    },
    middle_name : {
        type : String
    },
    last_name : {
        type : String,
        required : true
    },
    prefix : {
        type : String,
        enum : ['Mr', 'Mrs', 'Ms', 'Mx']
    },
    suffix : {
        type : String,
        enum : ['Sr', 'Jr']
    },
    _id : false
});

var Property = new Schema({
    any : String,
    _id : false
});
var Test = new Schema({
    test_name : {
        type : String,
        required : true
    },
    test_properties : {
        type : [Property],
        required : true
    },
    _id : false
});

var Report = new Schema({
    title : {
        type : String,
        required : true
    },
    report_date : {
        type : Date,
        default : Date.now() 
    },
    tests : {
        type : [Test],
        required : true
    }
});

var ReportCollection = new Schema({
    patient_aadhaar_id : {
        type : String,
        required : true
    },
    patient_name : {
        type : Name,
        required : true  
    },
    doctor_registration_id : {
        type : String,
        required : true
    },
    doctor_name : {
        type : Name,
        required : true
    },
    reports : {
        type : [Report],
        required : true
    }
});

module.exports = ReportCollection;
