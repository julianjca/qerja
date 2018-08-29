var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var routeEmployee = require('./routes/routeEmployee');
var routeEmployer = require('./routes/routeEmployer');


const home = require('./routes/home');

const port = 3000;

//Use Body Parser and EJS
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

//Using Routes
app.use('/', home);

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});

app.use('/employees', routeEmployee);
app.use('/employers', routeEmployer);

