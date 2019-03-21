const tokenJWT = require('./token'),
  checkJWTJson = require('../config/config.jwtcheck.json');

module.exports = function verifyTokenMW(req, res, next) {


  if (checkToken(req)) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token) {
      if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length).trimLeft();
      }
    }

    tokenJWT.verify(token)
      .then((decodedToken) => {
        req.userId = decodedToken.id;
        req.role = decodedToken.role;
        next()
      })
      .catch((err) => {
        console.log(err);
        res.status(400)
          .json({ message: "Invalid auth token provided." })
      })
  } else {
    next()
  }
}

function checkToken(req) {
  let url = req.originalUrl.split('/');
  return checkJWTJson[url[2]][req.method]
}