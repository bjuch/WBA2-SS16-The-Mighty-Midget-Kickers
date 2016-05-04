var fs = require("fs");

// asynchrones einlesen
fs.readFile('wolkenkratzer.json', function (err, data) {
   if (err) {
       return console.error(err);
   }
   console.log("asynchrones einlesen: " + data.toString());
});


