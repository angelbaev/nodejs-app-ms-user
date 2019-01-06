# App User Microservice - MVC Domain Driven Design

An app demonstrating simple MVC Domain Driven Design API implementation with NodeJs, Express and Sqlite3

The `api` uri preceeds all API endpoints and the following endpoints are currently available

+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| Method | Route             | Params      | Description                                                               | Use Bearer token |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| POST   | /sso/authenticate | email*      |                                                                           | No               |
|        |                   | password*   |                                                                           |                  |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| POST   | /sso/verify       | token*      | Checks the submitted token  is active or expired                          | No               |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| POST   | /sso/expire       | token*      | Changes the submitted token status of expired                             | No               |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| GET    | /users            |             | Returns a list of users.                                                  | Yes              |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| GET    | /users/:id        |             | Returns detailed information about an user.                               | Yes              |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| POST   | /users            | first_name* | Create new user and return detailed information about the user.           | No               |
|        |                   | last_name*  |                                                                           |                  |
|        |                   | email*      |                                                                           |                  |
|        |                   | password*   |                                                                           |                  |
|        |                   | status*     |                                                                           |                  |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| PUT    | /users/:id        | first_name* | Update the submitted user and return detailed information about the user. | Yes              |
|        |                   | last_name*  |                                                                           |                  |
|        |                   | email*      |                                                                           |                  |
|        |                   | password*   |                                                                           |                  |
|        |                   | status*     |                                                                           |                  |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| PATCH  | /users/:id        | first_name  | Update the submitted user and return detailed information about the user. | Yes              |
|        |                   | last_name   |                                                                           |                  |
|        |                   | email       |                                                                           |                  |
|        |                   | password    |                                                                           |                  |
|        |                   | status      |                                                                           |                  |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+
| DELETE | /users/:id        |             | Remove the submitted user.                                                | Yes              |
+--------+-------------------+-------------+---------------------------------------------------------------------------+------------------+

The live app is available on heroku here
demo:
   email: demo@domain.com
   password: 123
[https://app-ms-user.herokuapp.com/](https://app-ms-user.herokuapp.com/)


Get in Touch
===============

[I am available on](https://www.linkedin.com/in/angel-baev-33730150/)
