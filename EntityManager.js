//EntityManager.js

function createEntity(...components) {
  return Object.assign({}, ...components);
}
module.exports = { createEntity };
