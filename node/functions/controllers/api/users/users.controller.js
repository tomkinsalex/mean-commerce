const userRepo = require('../../../lib/usersRepository'),
    token = require('../../../lib/token'),
    util = require('util');

class UsersController {

    constructor(router) {
        router.get('/:id', this.getUser.bind(this));
        router.post('/register', this.register.bind(this));
        router.post('/login', this.login.bind(this));
    }

    login(req, res) {
        console.log('*** login attempt');

        userRepo.login(req.body, (err, user) => {
            if (err) {
                console.log('*** login error: ' + util.inspect(err));
                res.json({ 
                    status: false, 
                    error: err.message, 
                });

            } else {
                console.log('*** login response ok');
                res.json({
                    status: true,
                    token: token.create(user)
                });
            }
        });
    }

    register(req, res) {
        console.log('*** register');
        userRepo.register(req.body, (err, user) => {
            if (err) {
                console.log('*** register error: ' + util.inspect(err));
                res.json({ 
                    status: false, 
                    error: err.message
                });

            } else {
                console.log('*** register ok');
                res.json({ 
                    status: true, 
                    token: token.create(user)
                });
            }
        });
    }

    getUser(req, res) {
        console.log('*** getUser');
        const id = req.params.id;
        console.log(id);

        userRepo.getUser(id, (err, user) => {
            if (err) {
                console.log('*** getUser error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getUser ok');
                res.json(user);
            }
        });
    }
}

module.exports = UsersController;