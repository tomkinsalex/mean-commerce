const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../models/user'),
    passwordManager = require('./passwordManager');

class UsersRepository {

    login(body, callback) {
        let email = body.email,
            password = body.password;
        if (email) {
            User.findOne({ 'email': email.toLowerCase() }, (err, user) => {
                if (err) {
                    callback(err);
                }
                if (!user) {
                    callback({ 'message': "User doesn't exist" });
                } else {
                    passwordManager.checkPassword(user, password)
                        .then((resp) => {
                            if (resp) {
                                callback(null, user);

                            } else {
                                callback({ 'message': 'Password mismatch' });
                            }
                        }).catch((err) => {
                            callback({ 'message': 'Server Error' });
                        });
                }
            });
        } else {
            callback({ 'message': 'No email provided' })
        }
    }

    register(body, callback) {
        console.log('***  UsersRepository.register');
        let email = body.email;
        if (email) {
            User.findOne({ 'email': email.toLowerCase() })
                .then((foundUser) => {
                    if (foundUser) {
                        if (foundUser.role === "USER") {
                            callback({ 'message': "Email already used by another account" });
                        }
                    } else {

                        let user = new User();
                        user._id = new mongoose.Types.ObjectId();
                        user.first_name = body.first_name;
                        user.last_name = body.last_name;
                        user.email = body.email;
                        user.password = body.password;
                        user.role = "USER";

                        passwordManager.hashPassword(user)
                            .then((resp) => {
                                user = resp;
                                user.save((err, user) => {
                                    if (err) {
                                        console.log(`*** UsersRepository saveUser error: ${err}`);
                                        return callback(err, null);
                                    }
                                    callback(null, user);
                                });
                            })
                            .catch((err) => {
                                console.log(err);
                                callback({ 'message': "Server error" })
                            });
                    }
                });
        } else {
            callback({ 'message:': 'No body' })
        }

    }

    guest(body, callback) {
        console.log('***  UsersRepository.guest');
        let email = body.email;
        if (email) {
            let user = new User();
            user._id = new mongoose.Types.ObjectId();
            user.first_name = body.first_name;
            user.last_name = body.last_name;
            user.email = body.email;
            user.role = "GUEST";

            user.save((err, user) => {
                if (err) {
                    console.log(`*** UsersRepository saveUser error: ${err}`);
                    return callback(err, null);
                }
                callback(null, user);
            });

        } else {
            callback({ 'message:': 'No body' })
        }

    }

    // get a  User
    getUser(id, callback) {
        console.log('*** UsersRepository.getUser');
        User.findById(id, (err, user) => {
            if (err) {
                console.log(`*** UsersRepository.getUser error: ${err}`);
                return callback(err);
            }
            user.password = null;
            callback(null, user);
        });
    }
}

module.exports = new UsersRepository();