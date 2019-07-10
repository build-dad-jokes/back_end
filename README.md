[https://dad-jokes-bw.herokuapp.com/]

# Authentication

## Restricted Routes:

| GET                 | PUT           | POST      | DELETE        |
| ------------------- | ------------- | --------- | ------------- |
| api/users           | api/users/:id | api/jokes | api/users/:id |
| api/users/:id       | api/jokes/:id |           | api/jokes/:id |
| api/users/:id/jokes |               |           |
| api/jokes/:id       |               |           |

## Register - /api/auth/register

    "username" : "string",
    "password" : "string"

    username must be unique

## Login - /api/auth/login

    "username": "string",
    "password": "string"

returns JWT token - must be sent back for access to restricted routes

# Users
