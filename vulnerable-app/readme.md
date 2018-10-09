
This application is a demonstration prototype just to show how to use PassportJS framework with ExpressJS.

# Getting started

* Install required dependencies

$ npm install

* Register your application on GitHub with :

Homepage URL: http://127.0.0.1:3000
Authorization callback URL : http://127.0.0.1:3000/signin/github/callback

* Run this prototype

$ NODE_ENV=production PORT=3000 HOST=127.0.0.1 CLIENT_ID=xxxxxxxxxxxxxxxx CLIENT_SECRET=yyyyyyyyyyyyyyyyyyyyy JWT_SECRET=zzzzzzz npm start
 
# Test it

1.Open your browser on http://127.0.0.1:3000/signin/github and accept the authorization request on GitHub

# More

Designed to be used with the docker-compose machine
