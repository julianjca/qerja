var express = require('express');
var app = express();
var bodyParser = require('body-parser');

const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.listen(port,()=>{
  console.log(`application is on port:${port}`);
});