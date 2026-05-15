const jwt = require('jsonwebtoken');

const { logError, logConfig } = require('../../lib/util');
const pass = require('../pass')
const { getSecret } = require('./secret');

const authorizeJWT = (req, res, next) => {
  const token = req.headers.authorization;
  const resource = `${req.method} ${req.path}`

  if(['/db', '/logs', '/auth/login', '/auth/logout'].includes(req.path)){
    return next()
  }

  if (token) {
    jwt.verify(token, getSecret(), (err, user) => {
      if (err) {
        logError(() => `${resource} Authorization failed, ${err}`)
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    logError(() => `${resource} Missing authorization headers`)
    res.sendStatus(401);
  }
};

module.exports = auth => {
  if (auth){
    logConfig(`JWT Authorization ON`)
    return authorizeJWT
  } else {
    logConfig(`JWT Authorization OFF`)
    return pass
  }
}
