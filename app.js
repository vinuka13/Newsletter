const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html")
});

app.post ("/", function(req,res){

  var first = req.body.first;
  var second = req.body.second;
  var email = req.body.email;

 var data = {
   members: [
     {
       email_address : email,
       status : "subscribed",
       merge_fields : {
         FNAME : first,
         LNAME : second,
       }
     }
   ]
 }

 const jasonData = JSON.stringify(data);

 const url = "maichimp-url";

 const options = {
    method : 'POST',
    auth : "mailchimp-id"
 }

 const request = https.request(url, options, function(response){
   response.on("data", function(data){
     console.log(JSON.parse(data));
   })
 })

 request.write(jasonData);
 request.end();

});



app.listen(3000, function(){
  console.log("server is running")
});


//api key
//

//id
//
