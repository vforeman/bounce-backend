var express = require('express'),
  restful = require('node-restful'),
  bodyParser = require('body-parser'),
  mongoose = restful.mongoose;

var app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(express.query());

mongoose.connect('mongodb://admin:bounce@ec2-54-165-238-193.compute-1.amazonaws.com:27017/bounce');

var Resource = app.resource = restful.model('resource', mongoose.Schema({
  title: 'string',
  year: 'number',
}))
.methods(['get', 'post', 'put', 'delete']);

Resource.register(app, '/resources');

app.listen(3000);
