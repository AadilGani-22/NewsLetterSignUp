const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
// const { url } = require("inspector");
const https = require("https");
const { json } = require("express/lib/response");

const app = express();


app.use(express.static("public"));
// to get the relative url in the html page 
// html page can redirect 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html");
});

app.post("/",function(req,res){
    const firstName= req.body.fName;
    const lastName= req.body.lName;
    const email= req.body.email;
    
    const data={
        members:[
            {
                email_address : email,
                status : "subscribed",
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName,
                }
            }
        ]
    };
    var jsonData= JSON.stringify(data);
    const url = "https://us10.api.mailchimp.com/3.0/lists/e846a9f6a0";


    const options = {
        method:"POST",
        auth:"aadil:710d9b48fb3fa1bb6b07c7e445573dcc-us10"
    }
    const request = https.request(url,options,function(response){

        if(response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }else{
            res.sendFile(__dirname + "/faliure.html");
        }

      response.on("data",function(data){
          console.log(JSON.parse(data));
      });

    });
    request.write(jsonData);
    request.end();
});

app.post("/faliure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("Server started on port");
});

// Api Keys
// 710d9b48fb3fa1bb6b07c7e445573dcc-us10

// Unique ID
// e846a9f6a0.