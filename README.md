# MEAN Commerce - MongoDB, ExpressJS, Angular, NodeJS

A basic E-Commerce Application

## Software Requirements To Run Locally

* Node.js 6.10 or higher
* MongoDB 3.2 or higher

### Running the Application Locally

1. Install Node.js (6.10 or higher), MongoDB (3.2 or higher), Firebase CLI and Angular CLI

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
	* `cd ..`
	* `firebase serve`

4. Execute the following commands to serve the Angular app: 
	
	* `cd angular`
	* `cp src/environments/environment.prod.example.ts src/environments/environment.prod.ts`
	* `npm install`

6. In your Firebase Console in your new project -> Authentication -> Set Up Sign Method -> Enable Email -> Web Setup -> Copy the following section into `src/environments/environment.prod.example.ts`:

	 `firebase: {
	    apiKey: "YOUR_API_KEY",
	    authDomain: "YOUR_AUTH_DOMAIN",
	    databaseURL: "YOUR_DATABASE_URL",
	    projectId: "YOUR_PROJECT_ID",
	    storageBucket: "YOUR_STORAGE_BUCKET",
	    messagingSenderId: "YOUR_SENDER_ID"
	  }`

7. Run `ng serve`

8. Browse to http://localhost:4200