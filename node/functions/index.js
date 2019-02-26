const express       = require('express'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    csrf            = require('csurf'),
    morgan          = require('morgan'),
    functions       = require('firebase-functions'),
    router          = require('./routes/router'),
    database        = require('./lib/database'),
    seeder          = require('./lib/dbSeeder'),
    app             = express();

class Server {

    constructor() {
        this.initExpressMiddleWare();
        this.initCustomMiddleware();
        this.initRoutes();
        this.initDbSeeder();
        this.start();
    }

    start() {
        app.listen();
    }


    initExpressMiddleWare() {
        app.use(express.static(__dirname + '/public'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());
        //app.use(csrf({ cookie: true }));
        
        var allowCrossDomain = function(req, res, next) {
            res.header('Access-Control-Allow-Origin', "*");
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
            res.header('Access-Control-Allow-Headers', 'Content-Type');
            next();
        }
        app.use(allowCrossDomain);

        /*
        app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });
        */

        process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    initCustomMiddleware() {
        if (process.platform === "win32") {
            require("readline").createInterface({
                input: process.stdin,
                output: process.stdout
            }).on("SIGINT", () => {
                console.log('SIGINT: Closing MongoDB connection');
                database.close();
            });
        }

        process.on('SIGINT', () => {
            console.log('SIGINT: Closing MongoDB connection');
            database.close();
        });
    }

    initDbSeeder() {
        database.open(() => {
            seeder.init();
        });
    }
    initRoutes() {
        router.load(app);
    }
}

let server = new Server();

exports.app = functions.https.onRequest(app);