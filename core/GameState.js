// core/GameState.js
const createFishGroup = require('../entities/createFishGroup');
const loadFishConfigs = require('../config/fishConfig');

// ✅ 与 Hook.js 中一致
const imageOffsetXRatio = -0.05;

function initState(screenWidth, screenHeight, assets) {
  const fishConfigs = loadFishConfigs();
  const fishList = [];

  for (const fishName in fishConfigs) {
    const config = fishConfigs[fishName];
    const imgKey = `${fishName}Img`;
    if (!assets[imgKey]) {
      console.warn(`⚠️ 缺少图片资源：${imgKey}`);
      continue;
    }
    config.img = assets[imgKey];
    const group = createFishGroup(config, 3);
    fishList.push(...group);
  }

  return {
    hook: {
      x: screenWidth / 2 - imageOffsetXRatio * screenWidth * (53.6 / 375),
      y: screenHeight * 0.382,
      attachedFishes: [],           // ✅ 支持多鱼挂钩
      swingAngle: 0,                // ✅ 摆动角度
      swingVelocity: 0.8,           // ✅ 初始角速度（确保启动摆动）
    },
    fishList,
    lastTime: Date.now(),
    bgY: 0,
  };
}

module.exports = { initState };
