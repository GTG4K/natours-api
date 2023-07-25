exports.checkNameAndPrice = (req, res, next) => {
  const name = req.body.name;
  const price = req.body.price;

  if (!name || !price) {
    return res.status(400).json({ status: 'fail', message: 'Name or price missing' });
  }

  next();
};