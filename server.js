const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine', 'ejs');


var db;

MongoClient.connect('mongodb://afar:afar@ds039427.mlab.com:39427/star-wars-quotes', (err, database) => {
	if (err) return console.log(err);
	db = database;
	app.listen(3000, () => {
		console.log('May Node be with you');
	})
})


app.get('/', (req, res) => {
	var cursor = db.collection('quotes').find().toArray( (err, result) => {
		if (err) return console.log(err);
		// renders index.ejs
		res.render('index.ejs', {quotes: result})
	});	
});


app.post('/quotes', (req, res) => {
	db.collection('quotes').save(req.body, (err, result) => {
		if (err) return console.log(err);

		console.log(req.body);
		console.log('saved to database');
		res.redirect('/');
	})
})

