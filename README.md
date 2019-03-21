# MEAN Commerce - MongoDB, ExpressJS, Angular, NodeJS

A basic E-Commerce Application

### Running the Application Locally

1. Install Node.js, MongoDB, Firebase CLI and Angular CLI

    * Node.js: https://nodejs.org
    * MongoDB: https://docs.mongodb.com/manual/administration/install-community
    * Firebase-CLI: https://firebase.google.com/docs/cli/
    * Angular-CLI: https://cli.angular.io/

2. Execute `mongod` to start the MongoDB daemon if it's not already running

3. Create a new project in your Firebase Console https://console.firebase.google.com/

4. Execute the following commands to get the Node API up and running: 
	
	* `cd node`
	* `firebase use --add`
	* Select your new project
	* `cd functions`
	* `npm install`
	* `cp .env.sample .env`

5. Run this 3 times `node -e "console.log(require('crypto').randomBytes(32).toString('hex'));"` 

6. Copy paste the values into node/functions/.env for JWT_SECRET_USER, JWT_SECRET_ADMIN, JWT_SECRET_GUEST

7. To run Node API --> `firebase serve`

8. Execute the following commands to serve the Angular app: 
	
	* `cd angular`
	* `cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts`
	* `npm install`

9. To run Angular App --> `ng serve`

10. Browse to http://localhost:4200