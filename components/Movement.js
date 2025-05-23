// components/Movement.js

const { addComponent } = require('../core/EntityManager');

/**
 * 添加水平往返移动组件
 */
function Movement(entityId, speedX, dirX, xRange) {
  addComponent(entityId, 'Movement', {
    speedX,
    dirX,
    xRange
  });
}

module.exports = Movement;
