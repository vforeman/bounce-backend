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
// app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());
//app.use(express.query());

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
var ItemModel = mongoose.model('Item', ItemSchema);

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

app.post('/items', function (req, res) {
    var item;
    console.log("POST: ");
    console.log(req);
    console.log(req.params);
    console.log(req.body);
    console.log(req.body.name);
    console.log(req.body.description);
    item = new ItemModel({
        name: req.body.name,
        description: req.body.description,
    });
    item.save(function(err) {
        if (!err) {
            return console.log("created");
        } else {
            return console.log(err);
        }
    });
    return res.send(item);
});

app.listen(3000,function(){
  console.log("listening on port 3000");
});
