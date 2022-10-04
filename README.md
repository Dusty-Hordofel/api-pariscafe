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

### 40. API Security - Testing with JWT Tokens from auth0

### 41. E-2-E Testing ORDER Fulfilment

### 42. API Dealing with ABANDONED Orders

### 43. API Testing - ABANDONED Orders

### 44. E-2-E Testing ABANDONED Orders

### 45. CI / CD - Deploy to Cloud

### 46. Testing ORDER , Payment Flows on Cloud

### 47. Responsive Design

### 48.

---

### 📚 MERN Stack References

- 🔗 [Official Site for MongoDB](https://mongodb.com)
- 🔗 [Official Site for Express.js](https://expressjs.com)
- 🔗 [Official Site for React.js](https://reactjs.org)
- 🔗 [Official Site for Node.js](https://nodejs.org/)

### 📚 Middleware References

- 🔗 [Express.js: Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
- 🔗 [express-jwt: Using Middleware](https://www.npmjs.com/package/express-jwt)
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

### 📚 Documentary References

- 🔗 [Stripe](https://stripe.com/fr)
- 🔗 [Stripe-payment](https://stripe.com/docs/checkout/quickstart)
- 🔗 [Stripe-fulfill-orders](https://stripe.com/docs/payments/checkout/fulfill-orders)

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
