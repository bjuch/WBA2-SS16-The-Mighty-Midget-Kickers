var express = require ("express");
var ejs = require("ejs");
var http = require("http");
var rest = express();
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require("fs");

var app = express();

rest.use(function(req, res, next){
console.log("Time: %d" + " Request-Pfad: " + req.path, Date.now());
next();
});

console.log("Server listen on Port: " + 3001);




rest.get("/user/Projekt/", jsonParser, function(req, res){
   
    fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/Projekt",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var Projojektdata = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, Projojektdata);
                    res.setHeader("content-type", "text/html");
                    res.writeHead(200);
                    res.write(html);
                    res.end();
                });
            });
            externalRequest.end();
        }
    });
});

rest.listen(3001);
