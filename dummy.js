var fs = require('fs');
var dummyjson = require('dummy-json');
var mongojs = require('mongojs');
var db = mongojs('127.0.0.1/hospital', ['testreports']);


var city = ["Mumbai","Delhi","Bengaluru","Ahmedabad","Hyderabad","Chennai","Kolkata","Pune","Jaipur","Surat","Lucknow","Kanpur","Nagpur","Patna","Indore","Thane","Bhopal","Visakhapatnam","Vadodara","Firozabad","Ludhiana","Rajkot","Agra","Nashik","Faridabad","Patiala","Meerut","Varanasi",  "Srinagar","Dhanbad","Jodhpur","Amritsar","Raipur","Allahabad","Coimbatore","Jabalpur","Gwalior","Vijayawada"];
var myMockData = {
    cities : city,
    streets : ["Australia antigen (HbsAg) RAPID", "Australia antigen", "HbsAg", "Australia antigen RAPID"]
};
var helpers = { 
    "resultValue" : function(){
        return ""+ Math.random() > 0.5 ? 'Positive' : 'Negative';
    }
};
var opt = {
    mockdata : myMockData 
};
var template = fs.readFileSync('schema.hbs', {encoding: 'utf8'});
var reports = dummyjson.parse(template, {mockdata : myMockData, helpers: helpers});
fs.writeFile("sample-dataset.json", reports, function(err){
    if(err){
        console.log(err);
    }
});
var input = JSON.parse(reports);
db.testreports.insert(input, function(err, docs){
    if(err){
        console.log(err);
    }
    console.log("Insert Successfull");
    db.close();
});
