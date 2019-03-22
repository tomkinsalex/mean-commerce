const   bcrypt      = require('bcrypt'),
        saltRounds  = 10;

class PasswordManager {

    checkPassword(user, passwordAttempt){
        return new Promise((resolve,reject) => {
            bcrypt.compare(passwordAttempt, user.password, (err, res) => {
                if(err){
                    reject(err)
                }else{
                    resolve(res)
                }
            });
        })
    }

    hashPassword(user){
        return new Promise((resolve, reject)=>{
            bcrypt.hash(user.password, saltRounds, (err, hash) => {
                if(err){
                    reject(err)
                }else{
                    user.password = hash;
                    resolve(user)
                }
            });
        })
    }
}

module.exports = new PasswordManager();