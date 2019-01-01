# App User Microservice

An app demonstrating simple API implementation with NodeJs, Express and Sqlite3

The `api` uri preceeds all API endpoints and the following endpoints are currently available
* POST `/sso/authenticate` - {"email": "demo@nodomain.com", "password": "123"}
* POST `/sso/verify` - {"token": ""} - verify token
* POST `/sso/expire` - {"token": ""} - expire token
* GET `/users/contacts` - use authorization header token from /sso/authenticate : authorization: Bearer token | user list
* GET `/users/:id` - use authorization header token from /sso/authenticate : authorization: Bearer token | user details
* POST `/users` - create new user {"first_name": "demo", "last_name": "demo", "email": "demo@nodomain.com", "password": "123", "status": 1}
* PUT `/users/:id` - use authorization header token from /sso/authenticate : authorization: Bearer token | update user details
* PATCH `/users/:id` - use authorization header token from /sso/authenticate : authorization: Bearer token | update user details
* DELETE `/users/:id` - use authorization header token from /sso/authenticate : authorization: Bearer token | delete user


The live app is available on heroku here
https://app-ms-user.herokuapp.com/


Get in Touch
===============

I am available on https://www.linkedin.com/in/angel-baev-33730150/