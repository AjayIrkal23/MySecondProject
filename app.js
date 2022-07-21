let express = require('express');
let app = express()
let morgan = require('morgan');
let bodyParser = require('body-parser');
let dotenv = require('dotenv');
let cors = require("cors")
dotenv.config()
let port = process.env.PORT || 9870;
let mongo = require('mongodb');
const nodemon = require('nodemon');
let mongoclient = mongo.MongoClient;
let mongourl = "mongodb+srv://Mercy:loloklol.12A@myfdatabse.qrcf595.mongodb.net/?retryWrites=true&w=majority"
let db;

app.use(morgan("common"))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

app.get('/allproducts', (req, res) => {
    let col = req.query.color;
    let qurey = {};
    let lcost = Number(req.query.lcost);
    let hcost = Number(req.query.hcost);

    if (col) {
        query = { color: col }
    } else {
        query = {}
    }
    db.collection('product').find(queryn, { _id: 0, Name: 1 }).toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})


app.get('/allbrands', (req, res) => {
    db.collection('Brands').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})

app.get('/ordersavailable', (req, res) => {
    db.collection('orders').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})

app.get('/brandcollusion', (req, res) => {
    db.collection('Collusion').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})

app.get('/brandMonki', (req, res) => {
    db.collection('Monki').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})


app.get('/brandNFD', (req, res) => {
    db.collection('Never Fully Dressed').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})

app.get('/brandRV', (req, res) => {
    db.collection('Reclaimed Vintage').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})
app.get('/Topshop', (req, res) => {
    db.collection('Topshop').find().toArray(function(err, product) {
        if (err) throw err;
        res.send(product);
    })
})

app.post('/orderitem', (req, res) => {

    if (Array.isArray(req.body.id)) {
        db.collection('product').find({ brand_id: { $in: req.body.id } }).toArray(function(err, product) {
            if (err) throw err;
            res.send(product);
        })
    }
})

app.post('/orders', (req, res) => {
    db.collection('orders').insert(req.body, function(err, product) {
        if (err) throw err;
        res.send("Order Placed")
    })
})

app.put('y', (req, res) => {
    let oid = Number(req.params.id);
    db.collection("orders").updateOne({ id: oid }, {
        $set: {
            "Payment": req.body.Payment,
            "TXNID": req.body.TXNID,
            "Status": req.body.Status,

        }
    }, function(err, product) {
        if (err) throw err;
        res.send("Order Updated")
    })
})




mongoclient.connect(mongourl, (err, client) => {
    if (err) console.log(`error while connecting`)
    db = client.db("Myproject")
    app.listen(port, () => {
        console.log(`listening on ${port}`)
    })
})