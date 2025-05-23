// systems/MovementSystem.js

const { getComponent, getEntitiesWith } = require('../core/EntityManager');
const GameWorld = require('../core/GameWorld'); // ✅ 改为使用 GameWorld

function MovementSystem(dt) {
  if (GameWorld.paused) return; // ✅ 检查 GameWorld 的暂停状态

  const Position = getComponent('Position');
  const Movement = getComponent('Movement');

  const ids = getEntitiesWith('Position', 'Movement');

  for (const id of ids) {
    const pos = Position[id];
    const mov = Movement[id];

    // 水平移动
    pos.x += mov.speedX * mov.dirX * dt;

    // 边界反转
    if (pos.x < mov.xRange.min) {
      pos.x = mov.xRange.min;
      mov.dirX = 1;
    } else if (pos.x > mov.xRange.max) {
      pos.x = mov.xRange.max;
      mov.dirX = -1;
    }

    // ✅ Debug 输出（可选）
    // console.log(`🐟 Entity ${id} pos.x: ${pos.x}, dirX: ${mov.dirX}`);
  }
}

module.exports = MovementSystem;
