module.exports.addNumbers = function (req, res) {
  let sum = 0;

  if (req.params.number) sum += parseInt(req.params.number);

  if (req.query.number) sum += parseInt(req.query.number);

  res.status(200).json({ sumOfNumbers: sum });
};
