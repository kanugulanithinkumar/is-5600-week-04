const path = require('path');
const Products = require('./products');
const autoCatch = require('./lib/auto-catch');

function handleRoot(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
}

async function listProducts(req, res) {
  const { offset = '0', limit = '25', tag } = req.query;
  const start = Number(offset);
  const count = Number(limit);

  if (!Number.isSafeInteger(start) || start < 0 ||
      !Number.isSafeInteger(count) || count < 1) {
    return res.status(400).json({
      error: 'Use a nonnegative integer for offset and a positive integer for limit.'
    });
  }

  const products = await Products.list({ offset: start, limit: count, tag });
  res.json(products);
}

async function getProduct(req, res, next) {
  const product = await Products.get(req.params.id);

  if (!product) {
    return next();
  }

  res.json(product);
}

function createProduct(req, res) {
  console.log('Request body:', req.body);
  res.json(req.body);
}

function updateProduct(req, res) {
  Products.update(req.params.id);
  res.status(200).json({ message: 'Product update simulated' });
}

function deleteProduct(req, res) {
  Products.remove(req.params.id);
  res.status(202).json({ message: 'Product deletion simulated' });
}

module.exports = autoCatch({
  handleRoot,
  listProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
}); 