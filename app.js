"use strict"

const exp = require('constants')
var express = require('express')
var app = express()
app.use(express.json())

app.listen(3000)
console.log('Node.js Express server is running on port 3000...')

app.get('/v1/weather', get_weather)

function get_weather(request, response) {
	response.json( 
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

app.get('/v1/hello', get_hello)

function get_hello(request, response) {
	response.json( {"greeting":"What a wonderful world... Get it? Hello World?"} )
}

app.post('/v1/auth', post_token) //accept a username and password and return a mock tocken

function post_token(request, response) {
	var	username = request.body.username
	var password = request.body.password
	
	response.json( 
		{
			"access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJBc3NpZ25tZW50NCIsIm5hbWUiOiJKZW5uaWZlciIsImlhdCI6MTY0MzU5MjM4N30.hTf1kZkngcZj_umUM-tWZ3dZq9W8kpQyS7paQISE40M",
			"expires": "2022-02-15T08:00:00.000Z"
		})
}