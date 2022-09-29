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

---

### 📚 MERN Stack References

- 🔗 [Official Site for MongoDB](https://mongodb.com)
- 🔗 [Official Site for Express.js](https://expressjs.com)
- 🔗 [Official Site for React.js](https://reactjs.org)
- 🔗 [Official Site for Node.js](https://nodejs.org/)

### 📚 Middleware References

- 🔗 [Express.js: Using Middleware](https://expressjs.com/en/guide/using-middleware.html)
- 🔗 [cors](https://www.npmjs.com/package/cors)
- 🔗 [morgan](https://www.npmjs.com/package/morgan)
- 🔗 [http-errors](https://www.npmjs.com/package/http-errors)
- 🔗 [joi](https://www.npmjs.com/package/joi)

### 📚 Other Node.js REST API Dependencies

- 🔗 [dotenv](https://www.npmjs.com/package/dotenv)
- 🔗 [MongooseJS](https://mongoosejs.com/)

### ⚙ Tools:

- 🔗 [React Dev Tools Extension for Chrome](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- 🔗 [Online Jpeg Tools](https://onlinejpgtools.com/convert-jpg-to-base64)

### ⚙ VS Code Extensions I Use:

- 🔗 [ES7 React JS Snippets Extension](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)
- 🔗 [vscode-icons VS Code Extension](https://marketplace.visualstudio.com/items?itemName=vscode-icons-team.vscode-icons)
- 🔗 [Turbo Console Log](https://marketplace.visualstudio.com/items?itemName=ChakrounAnas.turbo-console-log)

---

### 💻 Source Code

- 🔗 [Branche 1 - Intro to MERN](https://github.com/Dusty-Hordofel/api-pariscafe/tree/Catalog-Design)
