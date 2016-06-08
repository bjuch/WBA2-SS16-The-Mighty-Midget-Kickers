
var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var redis = require('redis');
var client = redis.createClient();
client.on('connect',function(){
    console.log('connected');
});


app.post('/user', function(req,res){
             
            var newUser = req.body;
            client.incr('id:user', function(err,rep){
            newUser.id = rep;
        
            client.set('user:' + newUser.id, JSON.stringify(newUser), function(err,rep)
                {
                    res.json(newUser);      
                });
             });
             if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    
    app.get('/user/:id' , function(req,res){
        
        client.get('user:'+req.params.id,function(err,rep){
            
            if(rep) {
                res.status(200).type('json').send(rep);
            }
            else {
                res.status(404).type('text').send('User not found');
            }
            if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    });

    app.delete('/user/:id',function(req,res){
        
        client.del('user:'+req.params.id,function(err,rep){
            if(rep == 1)
                {
                    res.status(200).type('text').send('User deleted');
                }
                else {
                    res.status(404).type('text').send('User not found');
                }
                if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    });
    
    app.put('/user/:id',function(req,res){
        client.exists('user:'+req.params.id, function(err,rep){
            if(rep == 1)
                {
                    var updatedUser = req.body;
                    updatedUser.id = req.params.id;
                    
                    client.set('user:'+req.params.id, JSON.stringify(updatedUser),function(err,rep){
                        res.json(updatedUser);
                    });
                }
                else{
                    res.status(404).type('text').send('User not found');
                }
                if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    });
    
    app.post('/user/:id/Projekt',function(req,res){
        client.existsts('user:'+req.params.id,function(err,rep){
            if(rep == 1)
            {
                client.hgetall('Projekt:').send(rep);    
            }
            if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    });

    app.get('/user/:id/Projekt',function(req,res){
        client.existsts('user:'+req.params.id,function(err,rep){
            if(rep == 1)
            {
                client.hgetall('Projekt:').send(rep);    
            }
            else{
                res.status(404).type('text').send('User not found');
            }
            if(err) {
                console.log(err);
                res.status(404).end("Datei nich gefunden");
            }
        });
    });

app.listen(3000);
