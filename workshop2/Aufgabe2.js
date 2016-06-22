
var express = require('express');
var bodyParser = require('body-Parser');
var jsonParser = bodyParser.json();
var app = express();
var redis = require('redis');
var client = redis.createClient();
client.on('connect',function(){
    console.log('connected');
});
app.use(jsonParser);

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



/*


app.get('/projekt/', jsonParser, function (req, res) {
  var objekt = JSON.parse(erfolgstabelle.json)
  document.write(erfolgstabelle[2].name)
  });


app.post('/projekt',jsonParser,function (req, res) {
  connection.connect();
  var projektname = req.body.name;
  var objekt = JSON.parse(erfolgstabelle.json)
    
    res.end(erfolgstabelle.toString());
  
  
                   });

app.get('/projekt',jsonParser, function (req, res){ 
 var objekt = JSON.parse(erfolgstabelle.json);
    
    res.write("Beispielhafte Ausgabe eines Teils des Json-Objekts erfolgstabelle");
  document.write('Name einer Aufgabe: ',erfolgstabelle[1].name);
  res.end();
});
*/
app.listen(3000);
