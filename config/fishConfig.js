// fishConfig.js（不要用 fs 了）
const shapes = require('../utils/Shapes');
const rawData = require('../data/fishData');

function loadFishConfigs() {
  const config = {};

  for (const item of rawData) {
    const shape = shapes[item.shape];
    if (!shape) {
      throw new Error(`Shape "${item.shape}" is not defined in Shapes.js`);
    }

    config[item.name] = {
      ...item,
      shape,
      img: null,
    };
  }

  return config;
}

module.exports = loadFishConfigs;
