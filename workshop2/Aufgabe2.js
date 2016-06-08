
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
