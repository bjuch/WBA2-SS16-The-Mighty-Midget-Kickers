var express = require('express');
var bodyParser = require ('body-parser');
var app = express();
var jsonParser = bodyParser.json();
var fs = require("fs");
var redis = require('redis');



   




/*

var project = [
    
    {title: "test1"},
    {title: "testos2"}
]
*/

app.get('/user/Projekt', function (req, res) {

  fs.readFile('Projekt.json', function (err, data) {
 
var obj = JSON.parse(data.toString())
var Tabelle = obj.Projekt; 

        Tabelle.forEach(function(entry){
                    
                   res.send(("Name: " +entry.Name+"\n Beschreibung: " +entry.Beschreibung+"\n Anforderung: " +entry.Anforderung+"\n Vorhanden: "+entry.Vorhanden+"\n Notizen: "+entry.Notitzen+"\n --------------"));

          
    
            });
            
});
    
 /*
    res.status(200).json();
*/

  });







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

