/**
 * /api/middleware/check-auth.js
 * Exports an arrow funtion used as middleware by the express app.
 * Validates presence of a valid auth token in request header
 */
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try{
    //get the token from header. Remove 'Bearer ' with split()[].
    const token = req.headers.authorization.split(" ")[1];
    //verify method verifies and decodes the token
    const decoded = jwt.verify(token, process.env.JWT_KEY)
    //add userData from the JWT to the request
    req.userData = decoded;
    next();
  }catch(err){
    res.status(401).json({
      message: 'Auth failed',
    });
  }

}