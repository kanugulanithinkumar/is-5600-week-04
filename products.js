const fs = require('fs').promises;
const path = require('path');

const productsFile = path.join(__dirname, 'data', 'full-products.json');

async function readProducts() {
  const data = await fs.readFile(productsFile, 'utf8');
  return JSON.parse(data);
}

async function list({ offset = 0, limit = 25, tag } = {}) {
  const products = await readProducts();

  const matchingProducts = tag
    ? products.filter(product =>
        product.tags?.some(productTag => productTag.title === tag)
      )
    : products;

  return matchingProducts.slice(offset, offset + limit);
}

async function get(id) {
  const products = await readProducts();
  return products.find(product => product.id === id);
}

function update(id) {
  console.log(`Product ${id} updated (simulation)`);
}

function remove(id) {
  console.log(`Product ${id} deleted (simulation)`);
}

module.exports = { list, get, update, remove }; 
