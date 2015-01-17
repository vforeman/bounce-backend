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

var Schema = mongoose.Schema;
var ItemSchema = new Schema({
    name: String,
    description: String,
    img_url: String
});
var item = app.item = restful.model('item', ItemSchema)
.methods(['get', 'post', 'put', 'delete']);
item.register(app, '/items');
// Function to get every item in the database
item.route('all.get', function(req, res, next) {
    res.send('Get all items');
});

var LenderSchema = new Schema({
    name: String,
    description: String,
    reputation: Number
});
var lender = app.lender = restful.model('lender', LenderSchema)
.methods(['get', 'post', 'put', 'delete']);
lender.register(app, '/lenders');

var BorrowerSchema = new Schema({
    name: String,
    description: String,
    reputation: Number
});
var borrower = app.borrower = restful.model('borrower', BorrowerSchema)
.methods(['get', 'post', 'put', 'delete']);
borrower.register(app, '/borrowers');

app.listen(3000);
