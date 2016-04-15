var http = require('http');

var fs = require('fs');

var documents = fs.readFileSync('sample-dataset.json', {encoding: 'utf8'});
documents = JSON.parse(documents);
sendRequest(0,documents);
  
  
function sendRequest(i, documents){
    if(i<documents.length){
    var data = { 'data' : {
         'optype' : 'insert',
         'insert' : documents[i]
    }};
    var headers = {
        'auth-token': '{"usertype" : "hospital" ,  "user_id" :  "6123"}',
        'Content-Type' : 'application/json'
    };

    var options = {
        host:'127.0.0.1',
        port : '8001',
        path : '/api/user',
        method:'POST',
        headers : headers,
        agent : false
    };

    var responseCallback = function(response){
        var res="";
        response.on('data', function(chunk){res+=chunk;});
        response.on('end',function(){
            console.log(i);
            i++;
            sendRequest(i,documents); 
        });
    };
    var req = http.request(options, responseCallback);
    req.on('error', function(err){console.log(err);});
    req.write(JSON.stringify(data));
    req.end();
    }
}