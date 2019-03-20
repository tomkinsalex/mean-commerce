
const tokenJWT = require('./token');

module.exports = function verifyTokenMW(req, res, next){

  let token = req.headers['x-access-token'] || req.headers['authorization']; 

  if (token.startsWith('Bearer ')) {
    token = token.slice(7, token.length).trimLeft();
  }

  tokenJWT.verify(token)
    .then((decodedToken) => {
      req.user = decodedToken.data
      next()
    })
    .catch((err) => {
      console.log(err);
      res.status(400)
        .json({message: "Invalid auth token provided."})
    })
}