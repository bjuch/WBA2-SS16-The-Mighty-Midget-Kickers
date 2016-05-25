var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var jsonParser = bodyParser.json();
app.use(jsonParser)        //Serverseitiges Parsen von json




app.get('/projekt', function (req, res {
res.send(jsonObject);    //Serverseitige Ausgabe eines json-Objektes
  }));
  
app.post('/projekt',jsonParser , function (req, res) {
  connection.connect();
  var projektname = req.body.name;
  
  express.readFile('erfolgstabelle.json', function (err, data)){
  if (err){
    console.log(err);
  }
  else{
  res.end(data.toString());
  }
  });
  
app.put('/projekt/projektname', function (req, res {
  //Veränderung des bestehenden Projekts
  }));
  











app.listen(3000);
