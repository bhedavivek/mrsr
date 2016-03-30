//var createHash = require('./scripts/Hash');
var generateHash = require('./scripts/Hash');
var docu ={
                        "title" : "Stool Examination",
                        "patient_aadhaar_id":"1",
                        "patient_name":{
                            "first_name":"Vivek",
                            "last_name":"Bheda"
                        },
                        'doctor_name':{
                            "first_name":"Hansa",
                            "last_name":"Bheda"
                        },
                        "doctor_registration_id":"1",
                        "tests" : [
                                {
                                        "test_name" : "Physical Examination",
                                        "test_properties" : [
                                                {
                                                        "property_name" : "Color",
                                                        "property_value" : "Brownish"
                                                }
                                        ]
                                }
                        ],
                        "report_date": '2016-03-30T09:01:16.151Z'
                        };

var mongoose = require('mongoose');
var db = mongoose.createConnection("mongodb://127.0.0.1/hospital");
                    db.on('error', function(){
                        console.error.bind(console, 'connection error:');
                    });
                    docu.report_hash = generateHash(JSON.stringify(docu));
                    db.once('open', function(){
                        var reportSchema = require('./models/reportSchema');
                        var Report = db.model('reportcollections', reportSchema);
                        Report(docu).save(function(err){
                            if(err){
                                console.log(err);
                            }
                            db.close();
                        });
                    });