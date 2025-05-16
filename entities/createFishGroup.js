const createFish = require('./createFish');

/**
 * 创建同类鱼群体
 * @param {Object} config - fish 配置项（从 fishes.json + fishConfig.js 解析）
 * @param {number} count - 创建多少条
 * @returns {Array} fish entity 列表
 */
function createFishGroup(config, count) {
  const group = [];

  for (let i = 0; i < count; i++) {
    const x = Math.random() * (config.xRange.max - config.xRange.min) + config.xRange.min;

    const y = Math.random() * (config.depthRange.max - config.depthRange.min) + config.depthRange.min;

    group.push(createFish({ x, y, ...config }));
  }

  return group;
}

module.exports = createFishGroup;
