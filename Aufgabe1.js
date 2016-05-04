var fs = require("fs");
var chalk = require('chalk');


// asynchrones einlesen
fs.readFile('wolkenkratzer.json', function (err, data) {

    
    /*if (err) {
       return console.error(err);
*/   
 
    
    // String in JS-Objekt umwandeln
    
    var obj = JSON.parse(data.toString())
    
    // Daten aus Wolkenkratzer entnehmen
    
    var Gebaude =obj.wolkenkratzer;
   
    //Sortieren der Ausgabe
    
    Gebaude.wolkenkratzer.sort(function(a,b) {
        if (a.hoehe > b.hoehe) {
            return 1;
        }
  		if (a.hoehe < b.hoehe) {
            return -1;
  		}
  		return 0;
    });
    
    // einfärben und Ausgabe
    
     Gebaude.forEach(function(entry){
                    
                    console.log(chalk.pink("Name: " +entry.name));
                    console.log(chalk.red("Stadt: " +entry.stadt));
                    console.log(chalk.purple("Hoehe: " +entry.hoehe));
                    console.log("--------------");
    
});
    
                
    
    
    

    
    
    
    
    
    
    /*
    
    //Aufgabe 1 asyncrhon ausgeben
    console.log("asynchrones einlesen: " + data.toString());
*/

});


