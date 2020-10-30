"use strict";

const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
const helmet = require('helmet');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'password',
	port: 3306,
	database : 'ExamDB'
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('.'));
app.use(morgan('tiny'));
app.use(helmet());

app.set('view engine', 'pug');
app.set('views', '.')

app.get('/', function(request, response) {
	response.render('/public/login.html')
	// response.sendFile(path.join(__dirname + '/public/login.html'));
	// response.render('index.html');
});

app.post('/login/auth', function(request, response) {
	console.log('Inside posty auth');
	var username = request.body.username;
	var password = request.body.password;
	if (username && password) {
		connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.username = username;
				return response.render('/public/home.html');
			} else {
				// console.log('Result is ' + results);
				response.send('Incorrect Username and/or Password!');
			}
			response.end();
		});
	} else {
		console.log(username, password);
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.get('/home', function(request, response) {
	// console.log('Inside HOME');
	response.redirect('/public/home.html');
	// if (request.session.loggedin) {
	// 	response.sendFile(path.join(__dirname + '/../home.html'));
	// 	// response.send('Welcome back, ' + request.session.username + '!');
	// } else {
	// 	response.send('Please login to view this page!');
	// }
	response.end();
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on ${port}`));
