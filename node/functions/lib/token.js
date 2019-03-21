const   jwt   = require('jsonwebtoken'),
        _     = require('lodash');  

class Token {

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET_GUEST, (err, decodedToken) => {
        if (err || !decodedToken) {
          return resolve( new Promise((resolve, reject) => {
            jwt.verify(token, process.env.JWT_SECRET_USER, (err, decodedToken) => {
              if (err || !decodedToken) {
                return resolve(new Promise((resolve, reject) => {
                  jwt.verify(token, process.env.JWT_SECRET_ADMIN, (err, decodedToken) => {
                    if (err || !decodedToken) {
                      return reject(err)
                    }
                    resolve(decodedToken)
                  })
                }))
              }
              resolve(decodedToken)
            })
          }))
        }
        resolve(decodedToken)
      })
    })
  }

  create(user) {

    let token = null;

    if(user.role === "USER"){
      token = jwt.sign({
        id: user._id,
        role: user.role
      }, process.env.JWT_SECRET_USER, {
          expiresIn: 3600,
          algorithm: 'HS256'
        })
    }else if(user.role === "ADMIN"){
      token = jwt.sign({
        id: user._id,
        role: user.role
      }, process.env.JWT_SECRET_ADMIN, {
          expiresIn: 1200,
          algorithm: 'HS256'
        })
    }else{
      token = jwt.sign({
        id: user._id,
        role: user.role
      }, process.env.JWT_SECRET_GUEST, {
          expiresIn: 1200,
          algorithm: 'HS256'
        })
    }
    return token
  }
}

module.exports = new Token();