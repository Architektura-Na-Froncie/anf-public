const jwt = require('jsonwebtoken');

const { logError, logDebug } = require('../../lib/util');
const { APIErrorDTO, ErrorCodes } = require('../../lib/api-error');
const credentials = require('./credentials.json');
const { getSecret, resetSecret } = require('./secret')

module.exports = (app) => {
  app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = credentials.find(u => { return u.username === username && u.password === password });

    if (user) {
      const accessToken = jwt.sign({ username: user.username, role: user.role }, getSecret());
      logDebug(() => `Authentication successful ${username}:${password}`);
      res.json({
        accessToken
      });
    } else {
      logError(() => `Username or password incorrect ${username}:${password}`);
      const errorDTO = APIErrorDTO("AUTH_FAILED", "Username or password incorrect")
      res.status(ErrorCodes.AUTH_FAILED).send(errorDTO);
    }
  });

  // JWT nuclear option ;) (TL;DR; changing secret invalidates _all_ tokens, in JWT there's no gentle way to end a single session on the server side, once the user posesses the token)
  // lame implementation, but it's enough for training purposes
  app.post('/logout', (req, res) => {
    resetSecret()
    res.send(200)
  });
}
