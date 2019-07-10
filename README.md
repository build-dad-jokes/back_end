[https://dad-jokes-bw.herokuapp.com/]

# Authentication

## Register - api/auth/register

    "username" : "string",
    "password" : "string"

    username must be unique

## Login - api/auth/login

    "username": "string",
    "password": "string"

    returns JWT token - must be sent back for access to restricted routes

## Restricted Routes:

| GET                 | POST      | PUT           | DELETE        |
| ------------------- | --------- | ------------- | ------------- |
| api/users           | api/jokes | api/users/:id | api/users/:id |
| api/users/:id       |           | api/jokes/:id | api/jokes/:id |
| api/users/:id/jokes |           |               |
| api/jokes/:id       |           |               |

# Users

## GET

### api/users

    Returns list of users
    {
        "id": integer,
        "username": "string"
    }

### api/users/:id

    Returns a users id and username
    {
        "id": integer,
        "username": "string"
    }

### api/users/:id/jokes

    Returns user's id, username, password, and jokes they have posted
    {
        "id": integer,
        "username": "string",
        "password": "string",
        "jokes": [
            {
                "id": integer,
                "joke": "string",
                "punchline": "string",
                "public": boolean,
                "user_id": integer,
                "created_at": date time,
                "updated_at": date time
            }
        ]
    }

## PUT

### api/users/:id

    Body
    {
        "username": "string",
        "password": "string
    }

    Returns
    {
        "message": "successfully updated credentials"
    }

## DELETE

### api/users/:id

    Returns
    {
        "message": "user deleted"
    }

# Jokes

## GET

### api/jokes

    Returns list of jokes
    {
        "id": integer,
        "joke": "string",
        "punchline": "string"
    }

### api/jokes/:id

    Returns a joke
    {
        "id": integer,
        "joke": "string",
        "punchline": "string"
    }

## POST

### api/jokes

    Body
    {
        "user_id": integer,
        "joke": "string",
        "punchline": "string
    }

## PUT

### api/jokes/:id

## DELETE

### api/joke/:id

    Returns
    {
        "message": "joke deleted"
    }
