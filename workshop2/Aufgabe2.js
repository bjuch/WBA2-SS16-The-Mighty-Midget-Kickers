var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser)        //Serverseitiges Parsen von json




app.get('/projekt', function (req, res {
res.send(jsonObject);    //Serverseitige Ausgabe eines json-Objektes
  }));
  
app.post('/projekt', function (req, res {
  connection.connect();
  var projektname = req.body.name;
  //Tabelle wird erstellt
  }));
  
app.put('/projekt/projektname', function (req, res {
  //Veränderung des bestehenden Projekts
  }));
  











app.listen(3000);