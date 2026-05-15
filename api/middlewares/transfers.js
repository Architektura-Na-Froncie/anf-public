const transfersMiddleware = (req, res, next) => {
  if (req.path.includes("/transfers")){
    Object.assign(req.query, {
      _sort: 'scheduledAt',
      _order: 'desc',
    })
  }
  next()
}

module.exports = transfersMiddleware
