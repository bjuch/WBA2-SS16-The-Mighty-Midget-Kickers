var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var fs = require("fs");
var redis = require('redis');


var db = redis.createClient();
app.use(bodyParser.json());

/*

var client = redis.createClient();
client.on('connect',function(){
    console.log('connected');
});
app.use(jsonParser);
*/




/*

var project = [
    
    {title: "test1"},
    {title: "testos2"}
]
*/

app.post("/user/Projekt/", function (req, res) {




    var newProjekt = req.body;

    db.incr("user/id:Projekt", function (err, rep) {
        newProjekt.id = rep;
        db.set("Projekt: " + newProjekt.id, JSON.stringify(newProjekt), function (err, rep) {
            res.json(newProjekt);
        });
    });


});

app.get("/user/Projekt/:id", function (req, res) {

    db.get("Projekt:" + req.params.id, function (err, rep) {

        if (rep) {
            res.type("json").send(rep);
        } else {
            res.status(404).type("text").send("Projekt mit der ID" + req.params.id + " wurde nicht gefunden")
        }

    });
});

app.put("/user/Projekt/:id", function (req, res) {
    db.exists("Projekt: " + req.params.id, function (err, rep) {
        if (rep == 1) {
            var updatedProjekt = req.body;
            updatedUser.id = req.params.id;
            db.set(" Projekt: " + req.params.id, JSON.stringify(updatedProjekt), function (err, rep) {
                res.json(updatedProjekt);
            });
        } else {
            res.status(404).type("text").send("Das Projekt mit der ID" + req.params.id + " wurde nicht gefunden")
        }
    });
});

app.delete("/user/Projekt/:id", function (req, res) {
    db.del("Projekt" + req.params.id, function (err, rep) {
        if (rep == 1) {
            res.status(200).type("text").send("gelöscht");
        } else {
            res.status(404).type("text").send("Das Projekt mit der ID" + req.params.id + " wurde nicht gefunden")
        }
    });

});


app.get("/user/Projekt", function (req, res) {
            db.keys("Projekt:*", function (err, rep) {

                    var Projekt = [];
                if (rep.length == 0){
                
                    res.json(Projekt);
                    return;
                }
                db.mget(rep, function (err, rep) {

                    rep.forEach(function (val) {
                        users.push(JSON.parse(val));
                    });

                    Projekt = Projekt.map(function (Projekt) {
                        return {
                            id: Projekt.id,
                            titel: Projekt.titel
                        };
                    });
                    res.json(Projekt);
                });
            });
});


        app.get('user/Projekttest', function (req, res) {


            fs.readFile('Projekt.json', function (err, data) {

                var obj = JSON.parse(data.toString())
                var Tabelle = obj.Projekt;



                var acceptedTypes = req.accepts(['json']);
                switch (acceptedTypes) {
                case "json":


                    //  Tabelle.forEach(function(entry){

                    res.status(200).json(Tabelle);
                    break;

                default:
                    res.status(406).end();
                }

            });

            //    });




        });




        app.post('/user/Projekttest', jsonParser, function (req, res) {


            fs.readFile('Projekt.json', function (err, data) {

                var obj = JSON.parse(data.toString())
                var Tabelle = obj.Projekt;




                Tabelle.push(req.body);
                res.type('plain').send('Added!');


            });

        });



        app.put('/user/Projekt', jsonParser, function (req, res) {


            fs.readFile('Projekt.json', function (err, data) {

                var obj = JSON.parse(data.toString())
                var Tabelle = obj.Projekt;




                Tabelle.push(req.body);
                res.type('plain').send('Added!');


            });

        });



        /*

        app.post('/user', function(req,res){
                     
                    var newUser = req.body;
                     client.incr('id:user', function(err,rep){
                    newUser.id = rep;
                
                    client.set('user:' + newUser.id, JSON.stringify(newUser), function(err,rep)
                    {
                     res.json(newUser);      
                           });
                     });
                });
            
            app.get('/user/:id' , function(req,res){
                
                client.get('user:'+req.params.id,function(err,rep){
                    
                    if(rep) {
                        res.status(200).type('json').send(rep);
                    }
                    else {
                        res.status(404).type('text').send('User not found');
                    }
                });
            });

        */
        /*

            app.delete('/user/:id',function(req,res){
                
                client.del('user:'+req.params.id,function(err,rep){
                    if(rep == 1)
                        {
                            res.status(200).type('text').send('User deleted')
                        }
                    else {
                        res.status(404).type('text').send('User not found');
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
                    else
                        {
                            res.status(404).type('text').send('User not found');
                        }
                });
            });

        app.post('/user/:id/Projekt',function(req,res){
           client.existsts('user:'+req.params.id,function(err,rep){
               if(rep == 1)
               {
                    client.hgetall('Projekt:').send(rep);    
               }
           }) ;
        });

        app.get('/user/:id/Projekt',function(req,res){
           client.existsts('user:'+req.params.id,function(err,rep){
               if(rep == 1)
               {
                    client.hgetall('Projekt:').send(rep);    
               }
           }) ;
        });

        app.post('user/projekt/comment',function(req,res){
            var newComment = req.body;
                     client.incr('comment', function(err,rep){
                    newComment.id = rep;
                
                    client.set('Kommentar:' + newComment.id, JSON.stringify(newComment), function(err,rep)
                    {
                     res.json(newComment);      
                           });
                     });
                });

        app.get('user/projekt/comment',function(req,res){
            if(rep == 1)
               {
                    client.hgetall('Alle Kommentare:').send(rep);    
               }
           }) ;
        });


        app.put('/user/:id/projekt/comment',function(req,res){
            client.exists('user:'+req.params.id, function(err,rep){
                    if(rep == 1)
                        {
                            var updatedComment = req.body;
                            updatedComment.id = req.params.id;
                            
                            client.set('user:'+req.params.id, JSON.stringify(updatedComment),function(err,rep){
                                res.json(updatedComment);
                            });
                        }
                    else
                        {
                            res.status(404).type('text').send('Comment not found');
                        }
                });
            });



        app.delete('user/:id/projekt/comment',function(req,res){
            client.existsts('user:'+req.params.id,function(err,rep){
                comment.del('comment:'+req.params.id,function(err,rep){
                    if(rep == 1)
                        {
                            res.status(200).type('text').send('Comment deleted')
                        }
                    else {
                        res.status(404).type('text').send('Comment not found');
                    }
                });
            });








        */









        /*

        var projekt2 = [
            {title: "projekt1"},
            {title: "projekt2"}
            
            ] 



        app.get('/projekt2', function (req, res) {
        res.status(200) .json(projekt2); 
        });


        */




        app.listen(3000);
