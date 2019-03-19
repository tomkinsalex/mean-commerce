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
    app             = express(),
    helmet          = require('helmet'),
    cors            = require('cors');

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
       // app.use(csrf({ cookie: true }));   
  
       /*  app.use((req, res, next) => {
            let csrfToken = req.csrfToken();
            res.locals._csrf = csrfToken;
            res.cookie('XSRF-TOKEN', csrfToken);
            next();
        });  */

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