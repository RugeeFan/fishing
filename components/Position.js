// components/Position.js

const { addComponent } = require('../core/EntityManager');

function Position(entityId, x = 0, y = 0) {
  addComponent(entityId, 'Position', { x, y });
}

module.exports = Position;
