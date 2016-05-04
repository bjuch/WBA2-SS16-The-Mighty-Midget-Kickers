var fs = require("fs");
var chalk = require('chalk');


// asynchrones einlesen
fs.readFile('wolkenkratzer.json', function (err, data) {
   if (err) {
       //return console.error(err);
   }
   console.log("asynchrones einlesen: " + data.toString());
   
       // String in JS-Objekt umwandeln
    
    var obj = JSON.parse(data.toString())
    
    // Daten aus Wolkenkratzer entnehmen
    
    var Gebaude =obj.wolkenkratzer;
    
    // einfärben und Ausgabe
    
    Gebaude.forEach(function(entry){
                    
                    console.log(chalk.pink("Name: " +entry.name));
                    console.log(chalk.red("Stadt: " +entry.stadt));
                    console.log(chalk.purple("Hoehe: " +entry.hoehe));
                    console.log("--------------");
    
}); 
   
});


