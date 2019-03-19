const express = require('express');

class Router {

    constructor() {
        this.routes = ['/users', '/customers', '/items', '/itemtypes', '/orderitems', '/orders', '/payments', '/shipments'];
        this.important = ['../controllers/api', '.controller.js', '/api'];

    }

    load(app) {
        
        for (let i = 0; i < this.routes.length; i++) {
            const router = express.Router();
            const controllerClass = require(this.important[0]+  this.routes[i] +  this.routes[i] + this.important[1]);
            const controller = new controllerClass(router);
            app.use(this.important[2] + this.routes[i], router);
        }

    }

}

module.exports = new Router();






