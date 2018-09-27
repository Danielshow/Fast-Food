[![Build Status](https://travis-ci.org/Danielshow/Fast-Food.svg?branch=develop)](https://travis-ci.org/Danielshow/Fast-Food)
[![Coverage Status](https://coveralls.io/repos/github/Danielshow/Fast-Food/badge.svg?branch=develop)](https://coveralls.io/github/Danielshow/Fast-Food?branch=develop)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/Danielshow/Fast-Food)

# Fast_food_fast
Web Application for ordering varieties of Food

fast food fast is a food delivery service app for a restaurant
This file consist of the UI template hosted on GH-pages and API hosted on heroku

## Prerequisites
1. [Node js](https://nodejs.org/en/)
2. [Postman](https://www.getpostman.com/) To test the endpoints
3. Any text Editor
4. [Git](https://git-scm.com/downloads)

## Installing

Clone this project using git clone https://github.com/Danielshow/Fast-Food/ on your bash or cmd

```shell
mkdir fast-food
cd fast-food
git clone https://github.com/Danielshow/Fast-Food/
cd "fast food"
npm Install
npm start
```
Hurray!!! You now have the files on your local computer
`npm install` will install all app dependencies
`npm start` will start the project

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

| HTTP verb | Routes  | Description |
|-----------| ------------- | ------------- |
| GET | /api/v1/foodlist  | Get all available food on the webpage  |
| GET | /api/v1/foodlist/:id  | Get one food by ID  |
| POST | /api/v1/foodlist  | Post new food  |
| PUT | /api/v1/foodlist  | Update posted food |
| DELETE | /api/v1/foodlist/:id  | Delete one food from the foodlist by ID |
| GET | /api/v1/price  | Get Price of all food ordered |
| GET | /  | Shows welcome page |
| GET | /api/v1/orders  | Get all ordered foods  |
| GET | /api/v1/orders/:id  | Get one order by ID  |
| GET | /api/v1/userorder/:id  | Get order by a specific user by ID  |
| POST | /api/v1/orders | Post new order |
| PUT | /api/v1/orders  | Update order status  |

## Contributing

If you'd like to Contribute, please fork the repository and create a new branch, commit to that branch and make a pull request

## Links

1. [Front End Homepage](https://danielshow.github.io/Fast-Food/)
2. [API on Heroku](https://evening-island-29552.herokuapp.com/api/v1)

## Author

1. Danielshow

## Acknowledgement

1. [Traversy Media](https://www.youtube.com/user/TechGuyWeb)
2. [Net Ninja](https://www.youtube.com/channel/UCW5YeuERMmlnqo4oq8vwUpg)
