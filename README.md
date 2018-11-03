[![Build Status](https://travis-ci.org/Danielshow/Fast-Food.svg?branch=develop)](https://travis-ci.org/Danielshow/Fast-Food)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/Danielshow/Fast-Food)
[![Coverage Status](https://coveralls.io/repos/github/Danielshow/Fast-Food/badge.svg?branch=develop)](https://coveralls.io/github/Danielshow/Fast-Food?branch=develop)
# Fast_food_fast
Web Application for ordering varieties of Food

fast food fast is a food delivery service app for a restaurant
This file consist of the UI template hosted on GH-pages and API hosted on Heroku

## Prerequisites
1. [Node js](https://nodejs.org/en/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)
4. Postgresql

## Installing

Clone this project using `git clone https://github.com/Danielshow/Fast-Food/` on your bash or cmd

```shell
mkdir fast-food
cd fast-food
git clone https://github.com/Danielshow/Fast-Food/
cd "fast food"
npm Install
git checkout develop
npm start
```
Hurray!!! You now have the files on your local computer
`npm install` will install all app dependencies
`npm start` will start the project

make your environment variable `.env file`
Fill in this data for postgresql and Json web token to work
```
PORT=3000
PGHOST=localhost
PGPASSWORD=
PGDATABASE=foodfast
PGUSER=
PGPORT=7432
JWT_KEY=
```

## Test
```shell
npm run test
```

## Features
1) user can create an account and log in
2) A user should be able to order for food
3) The admin should be able to add, edit, or delete fast food items
4) The admin should be able to see a list of fast food items
5) The admin user should be able to see list of orders, Accept and decline orders, mark orders as completed
6) User should be able to see history of ordered food

## API Routes
### [API DOCUMENTATION](https://app.swaggerhub.com/apis-docs/fastfood/FastFood/1.0#/)

| HTTP verb | Routes  | Description |
|-----------| ------------- | ------------- |
| POST | /api/v1/auth/signup | Register a user |
| POST | /api/v1/auth/login | Login a user |
| GET | /api/v1/auth/me | Get a specific user by user token |
| GET | /api/v1/auth/logout | Logout a user |
| GET | /api/v1/menu  | Get all available food on the webpage  |
| GET | /api/v1/menu/:id  | Get one food by ID  |
| POST | /api/v1/menu  | Post new food to foodlist |
| PUT | /api/v1/menu/:id | Update food by id |
| DELETE | /api/v1/menu/:id  | Delete one food from the foodlist by ID |
| GET | /api/v1/total  | Get Price of all food ordered |
| GET | /  | Shows welcome page |
| GET | /api/v1/orders  | Get all ordered foods  |
| GET | /api/v1/orders/:id  | Get one order by ID  |
| GET | /api/v1/users/:id/orders  | Get all order of a specific user by ID  |
| POST | /api/v1/orders | Post new order by user |
| PUT | /api/v1/orders/:id  | Update order status  |
| GET | /api/v1/users | Get all registered user |
| DELETE | /api/v1/users | Delete user account by user token |
| DELETE | /api/v1/users/:id | Delete user by ID |
| PUT | /api/v1/users/:id | Promote user to admin |

## Contributing

If you'd like to Contribute, please fork the repository and create a new branch, commit to that branch and make a pull request

## Links

1. [Front End Homepage](https://danielshow.github.io/Fast-Food/)
2. [API on Heroku](https://foodfaast.herokuapp.com/api/v1)
3. [Completed App](https://https://foodfaast.herokuapp.com)

## Author

1. Danielshow

## Acknowledgement

1. [Traversy Media](https://www.youtube.com/user/TechGuyWeb)
2. [Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
