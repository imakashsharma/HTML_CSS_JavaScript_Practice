const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

app.use(cors());


var MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://Amigo:123@democluster.4unbc.mongodb.net/demoDataBase?retryWrites=true&w=majority";
var dbo;
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    dbo = db.db("demoDataBase");
    console.log("Connected to Database")
});

// app.get('/', (req, res) => {
//     res.json({
//         message: 'Hello World'
//     });
// });

app.post("/postColor", function (req, res) {
    console.log("Connected with Collection")
    var q = req.body;
    dbo.collection("color_app").insertOne(q, function (err, res) {
        if (err) throw err;
        console.log("1 Color Inserted");
    })

});

app.get('/getColor',function(req,res){
    dbo.collection("color_app").find({}).toArray( function(err, result) {
        res.send(result);
        console.log("Exported Colors");
      }); 
    }
);

app.listen(9500, () => {
    console.log('Server is listening on port 9500');
});