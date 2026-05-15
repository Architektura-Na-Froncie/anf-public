const noop = function (req, res, next) {
  next()
};

module.exports = {
  noop
}
