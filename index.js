var express = require('express'),
    restful = require('node-restful'),
    bodyParser = require('body-parser'),
    _ = require('underscore'),
    Postmates = require('postmates'),
    mongoose = restful.mongoose,
    pmID = "cus_KAfMXiQv_RAS1",
    pmApiKey = "a829f142-e2d4-41da-9d05-80f11c40791d";

//EXPRESS SERVER CONFIGURATION
var app = express();
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
app.use(express.query());

//DATABASE CONNECTION INITIALIZATION
mongoose.connect('mongodb://admin:bounce@ec2-54-165-238-193.compute-1.amazonaws.com:27017/bounce');

// SCHEMA & MODEL VARIABLE DECLARATIONS
var Schema = mongoose.Schema;
var ItemSchema, LenderSchema, BorrowerSchema;
var item,lender,borrower;

//SCHEMA DEFINITIONS
ItemSchema = new Schema({
    name: String,
    description: String,
    img_url: String,
    cost: Number,
    available: Boolean,
    borrowers: String     //serialized array of borrower ids
});
LenderSchema = new Schema({
  name: String,
  address: String,
  phone : String,
  earnings : Number,
  items: String     //serialized array of lent item ids
});
BorrowerSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  items: String     //serialized array of borrowed item ids
});

//ENDPOINT METHODS ASSIGNMENT
item = app.item = restful.model('item', ItemSchema).methods(['get', 'post', 'put']);
lender = app.lender = restful.model('lender', LenderSchema).methods(['get', 'post', 'put']);
borrower = app.borrower = restful.model('borrower', BorrowerSchema).methods(['get', 'post', 'put']);

// Function to get every item in the database
item.route('all', function(req, res, next) {
  res.send('Get all items');
});

//ENDPOINT METHOD REGISTRATION *****HAS TO BE LAST***
item.register(app, '/items');
lender.register(app, '/lenders');
borrower.register(app, '/borrowers');



app.listen(3000,function(){
  console.log("listening on port 3000");
});
