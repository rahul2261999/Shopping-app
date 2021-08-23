exports.errorHandler = (res, options = {}) => {
  const { error, data, msg } = options;
  if (error) {
    return res.status(503).json({ error: 'Service unavailabel try again later' });
  }
  if (data) {
    return res.status(400).json({ error: msg });
  }
};
