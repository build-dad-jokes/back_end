# Authentication

## Register

POST
/api/auth/register
username - string, unique
password - string

## Login

POST
/api/auth/login
username - string
password - string

returns jwt token - must be sent back for restricted access

# Users

GET
/api/users
