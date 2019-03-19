const   userRepo = require('../../../lib/usersRepository'),
        util = require('util');

class UsersController {

    constructor(router) {
        router.get('/:id', this.getUser.bind(this));
        router.post('/register', this.register.bind(this));
        router.post('/login', this.login.bind(this));
    }

    login(req, res) {
        console.log('*** login attempt');
        userRepo.login(req.body, (err, data) => {
            if (err) {
                console.log('*** login error: ' + util.inspect(err));
                res.json({status: false, error: err.message, user_id: null});
            } else {
                console.log('*** login response ok');
                res.json({status: true, error: null, user_id: data});
            }
        });
    }

    register(req, res) {
        console.log('*** register');
        userRepo.register(req.body, (err, data) => {
            if (err) {
                console.log('*** register error: ' + util.inspect(err));
                res.json({status: false, error: err.message, user_id: null});
            } else {
                console.log('*** register ok');
                res.json({status: true, error: null, user_id: data});
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