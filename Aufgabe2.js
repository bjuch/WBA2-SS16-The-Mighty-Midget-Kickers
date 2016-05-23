var bodyParser = require ('body-parser')

var app = express();

app.get('/projekt', function (req, res {
res.send(jsonObject);    //Serverseitige Ausgabe eines json-Objektes
  )});
  
app.post('/projekt', function (req, res {
  connection.connect();
  var projektname = req.body.name;
  )});
  
var jsonParser = bodyParser.json();
app.use(jsonParser)        //Serverseitiges Parsen von json










app.listen(3000);
