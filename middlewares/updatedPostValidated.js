const schema = require('../utils/updateSchema');

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    const [code, message] = error.message.split('|');
    return res.status(code).json({ message });
  }

  return next();
};