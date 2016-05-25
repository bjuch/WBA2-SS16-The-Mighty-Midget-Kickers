var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser)        //Serverseitiges Parsen von json




app.get('/projekt', function (req, res {
  res.write("Beispielhafte Ausgabe eines Teils des Json-Objekts erfolgstabelle");
  document.write('Name einer Aufgabe: 'erfolgstabelle[1].name]);
  res.end();
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
