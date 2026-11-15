function cors(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
}

function notFound(req, res) {
  res.status(404).json({ error: 'Not Found' });
}

function handleError(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  console.error(err);
  res.status(500).json({ error: 'Internal Error Occurred' });
}

module.exports = { cors, notFound, handleError };