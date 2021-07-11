const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
mongoose.connect('mongodb://localhost/contactDance', { useNewUrlParser: true });
const port = 80;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
	firstname: String,
	lastname: String,
	age: String,
	address: String
});

const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')); // FOR SERVING STATIC FILE
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view-engine', 'pug'); // SET THE ENGINE AS A PUG
app.set('views', path.join(__dirname, 'views')); // SET THE VIEWS DIRECTORY

// END POINTS
app.get('/', (req, res) => {
	const params = {};
	res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
	const params = {};
	res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
	var myData = new Contact(req.body);
	myData
		.save()
		.then(() => {
			res.send('This item is saved to the data-base');
		})
		.catch(() => {
			res.status(400).send('Item was not saved to the data-base');
		});
});

// START THE SERVER
app.listen(port, () => {
	console.log(`The application started successfully on port ${port}`);
});
