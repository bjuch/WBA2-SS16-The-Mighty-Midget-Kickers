var bodyParser = require ('body-parser')

var app = express();

app.get('/projekt', function (req, res {
  // Liste wird ausgegeben 
  )});
app.post('/projekt', function (req, res {
  res.send(jsonObject);    //Serverseitige Ausgabe eines json-Objektes
  )});
  
var jsonParser = bodyParser.json();
app.use(jsonParser)        //Serverseitiges Parsen von json










app.listen(3000);
