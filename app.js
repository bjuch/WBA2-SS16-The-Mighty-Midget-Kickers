var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var fs = require("fs");
var redis = require('redis');
var ejs = require("ejs");
var http = require("http");

var rest = express();

var app = express();


var db = redis.createClient();
app.use(bodyParser.json());




app.post("user/:id/Projekt/", function (req, res) {
    db.exists('user/'+req.params.id,function(err,rep){
        if(rep){
            var newProjekt = req.body;
    
            db.incr('user/'+req.params.id+'/projektid:Projekt', function (err, rep) {
                newProjekt.projektid = rep;
                db.set("Projekt: " + newProjekt.projektid, JSON.stringify(newProjekt), function (err, rep) {
                    res.json(newProjekt);
                });
            });
        }
        else{
            res.status(404).type('text').send("User not found");
        }
    }

});

app.get("/user/:id/Projekt/:projektid", function (req, res) {

    db.get("Projekt:" + req.params.projektid, function (err, rep) {

        if (rep) {
            res.type("json").send(rep);
        } else {
            res.status(404).type("text").send("Projekt mit der ID" + req.params.id + " wurde nicht gefunden")
        }

    });
});

app.put("/user/Projekt/:id", function (req, res) {
    db.exists("Projekt: " + req.params.projektid, function (err, rep) {
        if (rep == 1) {
            var updatedProjekt = req.body;
            updatedProjekt.projektid = req.params.projektid;
            db.set(" Projekt: " + req.params.projektid, JSON.stringify(updatedProjekt), function (err, rep) {
                res.json(updatedProjekt);
            });
        } else {
            res.status(404).type("text").send("Das Projekt mit der ID" + req.params.projektid + " wurde nicht gefunden")
        }
    });
});

app.delete("/user/Projekt/:id", function (req, res) {
    db.del("Projekt" + req.params.projektid, function (err, rep) {
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
        if (rep.length == 0) {

            res.json(Projekt);
            return;
        }
        db.mget(rep, function (err, rep) {

            rep.forEach(function (val) {
                Projekt.push(JSON.parse(val));
            });

            Projekt = Projekt.map(function (Projekt) {
                return {
                    projektid: Projekt.projektid,
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

/*********************************************************************************************/

// STRICHLISTEN TEIL

app.get('/user/:id/Strichliste', function (req, res) {
    db.get('user:' + req.params.id + '/Strichliste', function (err, rep) {

        if (rep) {
            res.type('int').send(rep);
        } else {
            res.status(404).type('text').send('User does not exist');
        }
    });
});

app.put('/user/:id/Strichliste', function (req, res) {

    if (req == 1) {
        db.set('user/' + req.params.id + 'Strichliste', '0');
    } else if (req == 0) {
        db.incr('user/' + req.params.id + 'Strichliste');
    } else {
        res.status(406).type('text').send('Only 0 or 1 accepted');
    }
});

/*********************************************************************************************/


//USER TEIL

app.get('/user', function (req, res) {
    db.keys('user:*', function (err, rep) {

        var users = [];

        if (rep.length == 0) {
            res.json(user);
            return;
        }

        db.mget(rep, function (err, rep) {

            rep.forEach(function (val) {
                user.push(JSON.parse(val));
            });

            user = user.map(function (user) {
                return {
                    id: user.id,
                    name: user.name
                }
            });

            res.json(user);
        });
    });

});

app.put('/user/:id', function (req, res) {
    db.exists('user:' + req.params.id, function (err, rep) {
        if (req == 1) {
            var updatedUser = req.body;
            updatedUser.id = req.params.id;
            db.set('user:' + req.params.id, JSON.stringify(updatedUser), function (err, rep) {
                res.json(updatedUser);
            });
        } else {
            res.status(404).type('text').send('User not found')
        }
    });

});

app.post('/user', function (req, res) {
    var newUser = req.body;
    db.incr('id:user', function (err, rep) {
        newUser.id = rep;

        db.set('user:' + newUser.id, JSON.stringify(newUser), function (err, rep) {
            res.json(newUser);
        });
    })

});

app.delete('/user/:id', function (req, res) {
    db.del('user:' + req.params.id, function (err, rep) {
        if (rep == 1) {
            res.status(200).type('text').send('OK');
        } else {
            res.status(404).type('text').send('User does not exist')
        }
    });

});

app.get('/user/:id', function (req, res) {

    db.get('user:' + req.params.id, function (err, rep) {

        if (rep) {
            res.type('json').send(rep);
        } else {
            res.status(404).type('text').send('User does not exist')
        }
    });

});



/*******************************************************************/


//Kommentare



app.post('user/:id/Projekt/:projektid/kommentar', function (req, res) {
    var newComment = req.body;
    db.incr('user:'+req.params.id+':Projekt:'+req.params.projektid+':kommentar', function (err, rep) {
        newComment.kommentarid = rep;
        db.set('kommentar:' + newComment.kommentarid, JSON.stringify(newComment), function (err, rep) {
            res.json(newComment);
        });
    });
});

app.get('user/:id/projekt/:projektid/kommentar', function (req, res) {

    db.get('user:'+req.params.id+':projekt:'+req.params.projektid+':kommentar:' + req.params.kommentarid, function (err, rep) {

        if (rep) {
            res.type('json').send(rep);
        } else {
            res.status(404).type('text').send('No comments available');
        }
    });
});


app.put('/user/:id/projekt/:projektid/kommentar/:kommentarid', function (req, res) {
    db.exists('user:' + req.params.id, function (err, rep) {
        if (rep == 1) {
            db.exists('user:'+req.params.id+':projekt:'+req.params.projektid, function(err,rep){
                if(rep == 1){
                   db.exists('user:'+req.params.id+':projekt:'+req.params.projektid+':kommentar:'+req.params.kommentarid, function(err,rep){ 
                        if(rep == 1){
                            var updatedComment = req.body;
                            updatedComment.id = req.params.id;

                            db.set('user:' + req.params.id, JSON.stringify(updatedComment), function (err, rep) {
                                res.json(updatedComment);
                            });
                        }else {
                            res.status(404).type('text').send('Comment not found');
                        }
                   });
                }else {
                    res.status(404).type('text').send('Project not found');
                }
            })
        } else {
            res.status(404).type('text').send('User not found');
        }
    });
});



app.delete('/user/:id/projekt/:projektid/kommentar/:erstellerid', function (req, res) {
    db.existsts('user:' + req.params.id, function (err, rep) {
        db.del('/user/:id/projekt/:projektid/kommentar/' + req.params.id, function (err, rep) {
            if (rep == 1) {
                res.status(200).type('text').send('Comment deleted');
            } else {
                res.status(404).type('text').send('Comment not found');
            }

        });
    });
});


/*******************************************************************/


//ENDE

app.listen(3000, function () {
    console.log("Server listens on Port 3000");
})
