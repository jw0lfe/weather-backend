"use strict"

const exp = require('constants')
const cors = require('cors');
var express = require('express')
var app = express()
app.use(express.json())
app.use(cors())
const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');

const swaggerDocument = require('./swagger.json')

const users = [
	{
		"username": "jabob",
		"password": "D0nChaKn0w"
	}
]

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')


app.use('/doc', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/v1/weather', verifyToken, get_weather)//verify mock token and return weather

function get_weather(request, response) {
	response.status(200).json( 
		{
			"coord":
				{
					"lon":-123.262,
					"lat":44.5646
				},
			"weather":
				[
					{
						"id":804,
						"main":"Clouds",
						"description":"overcast clouds",
						"icon":"04n"
					}
				],
			"base":"stations",
			"main":
				{
					"temp":48.51,
					"feels_like":45.43,
					"temp_min":46.24,
					"temp_max":50.22,
					"pressure":1026,
					"humidity":75},
					"visibility":10000,
					"wind":
						{
							"speed":6.91,
							"deg":180
						},
					"clouds":
						{
							"all":100
						},
					"dt":1642131300,
					"sys":
						{
							"type":2,
							"id":2040223,
							"country":"US",
							"sunrise":1642088828,
							"sunset":1642121762
						},
					"timezone":-28800,
					"id":5720727,
					"name":"Corvallis",
					"cod":200
		})
}

app.get('/v1/hello', verifyToken, get_hello) //verify mock token and return greeting

function get_hello(request, response) {
	response.json( {"greeting":"What a wonderful world... Get it? Hello World?"} )
}

//verify mock token
function verifyToken(request, response, next) {
	const bearerHeader = request.headers['authorization'];
  
	if (bearerHeader) {
		const bearer = bearerHeader.split(' ');
	  	const bearerToken = bearer[1];
	  	request.token = bearerToken;
		if (request.token == "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBc3NpZ25tZW50NSIsIm5hbWUiOiJKZW5uaWZlciIsImlhdCI6MTY0MzU5MjM4N30.OkoupwFtwS5goVbUXkxZqtQhD-ciW6CvYj53phlff4k")
		{
	  		next();
		}
		
		else {	  
			response.status(401).send("Missing or invalid token")
		}
	}
	else {	  
		response.status(401).send("Missing or invalid token")
	}
  }

app.post('/v1/auth', post_token) //accept a username and password and return a mock tocken

function post_token(request, response) {
	var	username = request.body.username;
	var password = request.body.password;
		
	
	const user = users.find(x => {return x.username == username && x.password == password})

	if (user)
	{	
		response.json( 
		{
			"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBc3NpZ25tZW50NSIsIm5hbWUiOiJKZW5uaWZlciIsImlhdCI6MTY0MzU5MjM4N30.OkoupwFtwS5goVbUXkxZqtQhD-ciW6CvYj53phlff4k",
			"expires": "2022-02-15T08:00:00.000Z"
		})

	}
	else
	{
		response.status(403).send("Invalid user")
	}
}