const   jwt   = require('jsonwebtoken'),
        _     = require('lodash');  

class Token {

  verify(token) {
    return new Promise((resolve, reject) => {
      jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err || !decodedToken) {
          return reject(err)
        }

        resolve(decodedToken)
      })
    })
  }

  create(details) {
    if (typeof details !== 'object') {
      details = {}
    }

    if (!details.maxAge || typeof details.maxAge !== 'number') {
      details.maxAge = 3600
    }

    let token = jwt.sign({
      data: details.sessionData
    }, process.env.JWT_SECRET, {
        expiresIn: details.maxAge,
        algorithm: 'HS256'
      })

    return token
  }
}

module.exports = new Token();