module.exports = (req, res, next) => {
  if (!req.user && !req.merchant) {
    return res.status(401).send({ error: 'You must be logged in!' });
  }

  next();
};
