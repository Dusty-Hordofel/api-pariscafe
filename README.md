# "MERN Stack Project"

---

# Api-parisCafé

A brief description of what this project does and who it's for

---

### Author Links

👋 Hello, I'm Dusty Hordofel BAMANA.

🚀 Follow Me:

- [Twitter](https://twitter.com/...)
- [LinkedIn](https://www.linkedin.com/in/....)
- [Blog](https://.....)

---

### Description

🚀 This repository shares ALL of the resources referenced during the MERN Project.

---

## Section 1. Catalog Design

### 1. First Steps to API Driven Design

- create backend & src folder
- npm init -y
- npm i express dotenv cors
- npm i -D morgan nodemon
- create src->index.js(entrie point) & fill it.
- add a script in package.json file & create res.rest.
- add gitignore file.

### 2. Intro to MongoDB on Cloud

- setup MongoDB in the cloud...

### 3. API integration with Mongo

- npm i mongoose & connect to MongoDB database

### 4. Designing our First API

- create routes->category.js & controllers->category.js
- create {fetchAllCategories} controllers & test it creating http.category.rest

### 5. Designing our First Mongo model

- create a category models
- use category model in controllers->category.js
- test the script in http.category.rest

### 6. Designing API Error Handling Semantics

- npm i http-errors && index.js
- update category controllers

### 7. API - Create a Dish Category

- create createCategory routes and endpoint.
- test the script

### 8. Introduction to input validation on APIs

- npm i joi & create validators->schema-validator.js
- use schema-validator in category controllers & test the script

### 9. API End point - Retrieve Category By Id

- create getCategoryId & getCategory controllers

### 10. Design API Endpoint to create a dish resource

- create routes->dish.js, controllers->dish.js & validators->schema-validator
- create models->dish.js

### 11. Enhance API to work with binary data - upload dish image

- create savePhoto() && createDish
- use (https://onlinejpgtools.com/convert-jpg-to-base64)

### 12. API Input Data validation and Error Handling

- handle error in createDish controllers.
- create fetchDish & fetchDishById routes and controller

### 13. API Endpoint to Fetch All Dishes

- create createDish route and controller.

### 14. API Endpoint to retrieve dish photo

- create routes->dish->getDishPhoto & controller
- test the script in http.dish.rest

### 15. API Code Integration with Github

- add api-pariscafe folder in github if it isn't done.
- add Go to heroku (https://dashboard.heroku.com/apps) & create a new app (api-pariscafe)
- connect Heroku with Github and select the api-pariscafe branch.
- go to settings-> click on Reavel Config Vars & add (DATABASE,PORT & PREFIX)
- add a buildpack in settings
- loging with all project

### 16. API Deploy to Cloud - Heroku

- fix Heroku error & test the new script with heroku url
- See changes in heroku website.
- npm config set legacy-peer-deps true

### 17. Resolve Heroku - Bug

- don't deploy morgan and nodemon

### 18. UI - API Integration - Setting up AXIOS

- create a newDishes and test theses API.
- create request folder & put request files in it

### 19. API Endpoint to Filter Dishes By Category

- create searchByCategory route and controller

### 20. Deploy to Cloud - Heroku

- deploy api-pariscafe to heroku

## Section 2. Protecting your App

### 21. API Endpoint - User Creation

- create user route and controller.
- create a user model && controller->user.js

### 22. API Endpoint User Creation - Testing

- create user schema-validator.
- create request->http.user.rest

### 24. API Integration with auth0 security

##### token validation

- npm i express-jwt jwks-rsa
- create auth-> jwt-checker.js
- add token to the http.user.js and add request user object to createUser controller before testing the request.

##### NB: jwt-express does not support all nodejs version & generate error. it's took me many times before finding errors.

## Section 3. Preparing for Checkout

### 25. API Endpoint - Address Capture

- create {fetchById,getUserById} route and controller

### 26. Mongo Model Update

- create {updateAddress,getUserAddress} route and controller

### 27. CI/CD - Deploy to Heroku and Netlify

## Section 4. Payments Workflow Design

### 28. Intro to Stripe and Stripe Signup

- create a stripe payment & test a checkout stripepage.

### 29. Stripe Integration

- creat helpers-> StripeHelper.js
- create order route and controller
- create order model
- create orderConstants

### 30. Testing Stripe Integration

- create htpp.order.rest

### 31. API - Create Order

- update createOrder controller

### 32. Testing Create Order

- create payment model
- update createOrder controller
- test createOrder in htpp.order.rest

### 33. Stripe Webhook - ORDER Fulfilment

- create payment route and controller.
- add webhook endpoint using ngrok extension in stripe
- test stripe webhook

### 34. Stripe Webhook - ORDER Fulfilment - Continued

- update fulfilOrder controller
- test payment using client side

### 37. ORDER Fulfilment - Messaging

- update fulfilOrder controller
- create twilio count
- create helpers->TwilioHelper.js
- npm install twilio

### 38. Tiny Url Service - Sign Up with Bitly

- npm install bitly && create helpers->BitlyHelper.js
- update payment & order controllers

### 39. API Testing - ORDER Fulfilment

- test twilio and bitly by receiving a message from twilio with short url.

### 40. API Security - Testing with JWT Tokens from auth0

- crate a conditionnal rendering to extract user token in auth->AuthHelper.js
  -use getUser() in createOrder controller

### 41. E-2-E Testing ORDER Fulfilment

- test payment workflow

### 42. API Dealing with ABANDONED Orders

- create {getOrderById,updateOrderStatus,} routes and contollers

### 43. CI / CD - Deploy to Cloud

- api-pariscafe deployed on Heroku

### 46. Testing ORDER , Payment Flows on Cloud

### 47. Responsive Design

## Section 5. ORDER Management Workflow

### 48. Designing ORDER Component

- create user oder route and controller

### 49. API - Retrieve user specific ORDERS

- use aggregate MongoDB to retrieve user specific user orders

### 50. De-selecting ABANDONED Orders

- update order controller

### 51. CI / CD - Deploy to Cloud

- app deployed to Heroku cloud

## Section 6. ORDER Management ADMIN interface

### 52. Intro - ADMIN Interface

- create roles in Auth0 website & set auth pipeline setttings

### 53. ADMIN Profile , Retrieve ORDERS

- create {admin} route and controller.
- npm i express-jwt-authz

### 54. Implementing API Security with JWT Tokens

- update getOrdersForAdmin controller

### 55. Implementing Authorization - embedding SCOPEs in JWT tokens

- use jwtAuthz in getOrdersForAdmin controller

### 56. API Implement ACCEPT Orders Flow

- Accept request from the frontend

### 57. UI Testing ACCEPT Flow

- test all script

### 58. CI/CD - Deploy to Cloud

- deployed to Heroku cloud

## Section 7. ORDER Refund Flow

### 59. API - CANCEL Order

- create processRefund payment controller && cancelOrder()
- update payment model

### 60. Testing CANCEL Order

- Testing cancel order payments
- update stripeHelper,order route annd controller

### 61. REFUND Stripe Webhook event

- create a new Twilio message template

### 62. UI Integration - CANCEL Flow

### 63. E-2-E Testing CANCEL Flow

### 64. CI/CD - Deploy to Cloud

-deploy api-pariscafe to Heroku cloud

## Section 8. ORDER State Refresh - On Demand - Pull Model

### 65. Intro to Stripe CLI , ORDER Status Mongo Model Creation

- install stripe cli
- type stripe listen --forward-to http://localhost:xxxxxxxxxxxxxxxx in the terminal
- stripe logs tail

### 66. Refine ORDER Management Workflow

### 67. API Testing

### 68. UI Integration, Stripe Idempotent Requests

### 69. Retrieve ORDER by Id

### 70. UI Integration with multiple flows

### 71. CI/CD - Deploy to Cloud

### 72. Validating the Deploy on cloud

### 73. Validation of ORDER State refresh

## Section 9. Real Time Messaging - Web Sockets, Push Model

### 74. Intro to Web Sockets and Integration with API server

- create helpers->web-sockets

### 75. Sending Real time messages from server to client

- create pushMessageToClient() && updateStatus controller

### 76.

### 77. Display Notification on UI; Deploy to Cloud

### 78. Validation of Web sockets messaging between Netlify and Heroku

### 79.

### 80.

### 81.

### 82.

### 83.

---

### 📚 MERN Stack References

- 🔗 [Official Site for MongoDB](https://mongodb.com)
- 🔗 [Official Site for MongoDB - Aggregation](https://www.mongodb.com/docs/manual/aggregation/)
- 🔗 [Official Site for MongoDB - Aggregation](https://www.mongodb.com/basics/aggregation)
- 🔗 [Tutorialspoint MongoDB - Learning](https://www.tutorialspoint.com/mongodb/mongodb_aggregation.htm)
- 🔗 [Official Site for Express.js](https://expressjs.com)
- 🔗 [Official Site for React.js](https://reactjs.org)
- 🔗 [Official Site for Node.js](https://nodejs.org/)

### 📚 Middleware References

- 🔗 [Express.js: Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
- 🔗 [express-jwt: Using Middleware](https://www.npmjs.com/package/express-jwt)
- 🔗 [express-jwt-authz: Using Middleware](https://www.npmjs.com/package/express-jwt-authz)
- 🔗 [cors](https://www.npmjs.com/package/cors)
- 🔗 [morgan](https://www.npmjs.com/package/morgan)
- 🔗 [http-errors](https://www.npmjs.com/package/http-errors)
- 🔗 [joi](https://www.npmjs.com/package/joi)

### 📚 Other Node.js REST API Dependencies

- 🔗 [dotenv](https://www.npmjs.com/package/dotenv)
- 🔗 [MongooseJS](https://mongoosejs.com/)
- 🔗 [Stripe](https://www.npmjs.com/package/stripe)
- 🔗 [uuid](https://www.npmjs.com/package/uuid)
- 🔗 [twilio](https://www.twilio.com/fr/docs/sms/quickstart/node)
- 🔗 [bitly](https://dev.bitly.com/docs/tutorials/integrate-bitly-in-your-app/)
- 🔗 [socket.io](https://www.npmjs.com/package/socket.io)

### 📚 Documentary References

- 🔗 [Stripe](https://stripe.com/fr)
- 🔗 [Stripe-payment](https://stripe.com/docs/checkout/quickstart)
- 🔗 [Stripe-fulfill-orders](https://stripe.com/docs/payments/checkout/fulfill-orders)
- 🔗 [Stripe-Refund]()
- 🔗 [Auth0-Roles](https://auth0.com/docs/manage-users/access-control/sample-use-cases-rules-with-authorization)

### ⚙ Tools:

- 🔗 [React Dev Tools Extension for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- 🔗 [Online Jpeg Tools](https://onlinejpgtools.com/convert-jpg-to-base64)
- 🔗 [Ngrok for VSCode](https://marketplace.visualstudio.com/items?itemName=philnash.ngrok-for-vscode)
- 🔗 [Twilio](https://www.twilio.com/login)
- 🔗 [Bitly](https://bitly.com/)

### ⚙ VS Code Extensions I Use:

- 🔗 [ES7 React JS Snippets Extension](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- 🔗 [vscode-icons VS Code Extension](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- 🔗 [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)

---

### 💻 Source Code

- 🔗 [Branche 1 - Intro to MERN](https://github.com/Dusty-Hordofel/api-pariscafe/tree/Catalog-Design)
