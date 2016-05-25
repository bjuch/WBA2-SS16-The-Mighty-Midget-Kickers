var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser);       //Serverseitiges Parsen von json




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

app.listen(3000);
