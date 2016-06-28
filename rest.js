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

/*******************************************************************************************************/

// Strichliste 

app.get('/user/:id/Strichliste', function (req, res) {

  fs.readFile("./Strichliste.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/:id/Strichliste",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("get Strichliste");
                externalResponse.on("data",function(chunk){
                    
                    var Strichlistdata = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, Strichlistdata);
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

app.put('/user/:id/Strichliste', function (req, res) {
	
	fs.readFile("Strichlister.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/:id/Strichliste",
                method: "PUT",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("verändere Strichliste");
                externalResponse.on("data",function(chunk){
                    
                    var Strichlistdata = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, Strichlistdata);
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

/******************************************************************************************/

//USER Teil

app.get('/user',function(req,res){
 fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var User = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, User);
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

app.put('/user/:id',function(req,res){
 fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/:id",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var User = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, User);
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

app.post('/user',function(req,res){
	 fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var User = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var Projojektdata = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, User);
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

app.delete('/user/:id',function(req,res){
 fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/:id",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var User = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, User);
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

app.get('/user/:id',function(req,res){
  
 fs.readFile("./Projekt.ejs", {encoding: "utf-8"},function(err, filestring){
        if (err){
            throw err;
        }else{
            
            var options = {
                host: "localhost",
                port: 3000,
                path: "/user/:id",
                method: "GET",
                headers: {
                    accept: "application/json"                
            }
            }
            var externalRequest = http.request(options, function(externalResponse){
                console.log("Connected");
                externalResponse.on("data",function(chunk){
                    
                    var User = JSON.parse(chunk);
                    
                    var html = ejs.render(filestring, User);
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

/**********************************************************************/

//Ende

rest.listen(3001);


//Es ist nicht wirklich richtig, aber immerhin etwas