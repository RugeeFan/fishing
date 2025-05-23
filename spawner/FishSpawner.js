const { createEntity } = require('../core/EntityManager');
const Position = require('../components/Position');
const Render = require('../components/Render');
const Movement = require('../components/Movement');
const fishData = require('../data/fishData');

function spawnFish(assets, countPerType = 5) {
  const allIds = [];

  for (const fish of fishData) {
    const img = assets[`${fish.name}Img`];
    if (!img) {
      console.warn(`⚠️ 缺少图片资源: ${fish.name}`);
      continue;
    }

    for (let i = 0; i < countPerType; i++) {
      const id = createEntity();

      const x = Math.random() * (fish.movement.xRange.max - fish.movement.xRange.min) + fish.movement.xRange.min;
      const y = Math.random() * (fish.movement.depthRange.max - fish.movement.depthRange.min) + fish.movement.depthRange.min;

      console.log(`🐟 创建鱼 ${fish.name} at (${x}, ${y})`);

      Position(id, x, y);
      Render(id, {
        img,
        height: fish.size.height,               // ✅ 不需要传 width
        frames: fish.animation.frames,
        frameInterval: fish.animation.frameInterval,
        flip: fish.animation.direction === -1
      });
      Movement(id, fish.movement.speedX, fish.movement.dirX, fish.movement.xRange);

      allIds.push(id);
    }
  }

  return allIds;
}

module.exports = spawnFish;
