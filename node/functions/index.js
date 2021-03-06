const express       = require('express'),
    bodyParser      = require('body-parser'),
    cookieParser    = require('cookie-parser'),
    errorhandler    = require('errorhandler'),
    morgan          = require('morgan'),
    functions       = require('firebase-functions'),
    router          = require('./routes/router'),
    database        = require('./lib/database'),
    seeder          = require('./lib/dbSeeder'),
    app             = express(),
    helmet          = require('helmet'),
    cors            = require('cors'),
    tokenMW         = require('./lib/tokenMW'),
    canPerformMW         = require('./lib/canPerformMW');

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
        console.log("Hi, were in " + process.env.NODE_ENV +" mode");
    }


    initExpressMiddleWare() {
        app.use(helmet());
        app.use(express.static(__dirname + '/public'));
        app.use(morgan('dev'));
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json());
        app.use(errorhandler());
        app.use(cookieParser());
        app.use(cors());
        
         process.on('uncaughtException', (err) => {
            if (err) console.log(err, err.stack);
        });
    }

    initCustomMiddleware() {
        app.use(tokenMW);
        app.use(canPerformMW);

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