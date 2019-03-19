const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    User = require('../models/user');

class UsersRepository {

    login(body, callback) {
        let email = body.email,
            password = body.password;

        User.findOne({ 'email': email.toLowerCase() }, (err, user) => {
            if (err) {
                callback(err);
            }
            if (!user) {
                callback({ 'message': "User doesn't exist" });
            } else {
                if (user.password === password) {
                    callback(null, user._id);
                } else {
                    callback({ 'message': 'Password mismatch' });
                }
            }
        });
    }

    register(body, callback) {
        console.log('***  UsersRepository.register');
        let email = body.email;

        User.findOne({ 'email': email.toLowerCase() })
            .then((query) => {
                if (query) {
                    callback({ 'message': "Email already used by another account" });
                } else {

                    let user = new User();
                    user._id = new mongoose.Types.ObjectId();
                    user.first_name = body.first_name;
                    user.last_name = body.last_name;
                    user.email = body.email;
                    user.password = body.password;
                    user.role = "USER";

                    user.save((err, user) => {
                        if (err) {
                            console.log(`*** UsersRepository saveUser error: ${err}`);
                            return callback(err, null);
                        }

                        callback(null, user._id);
                    });

                }
            });

    }
    
     // get a  User
     getUser(id, callback) {
        console.log('*** UsersRepository.getUser');
        User.findById(id, (err, user) => {
            if (err) { 
                console.log(`*** UsersRepository.getUser error: ${err}`); 
                return callback(err); 
            }
            callback(null, user);
        });
    }
}

module.exports = new UsersRepository();