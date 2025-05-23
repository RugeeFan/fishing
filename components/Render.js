// components/Render.js

const { addComponent } = require('../core/EntityManager');

/**
 * 添加渲染组件，自动计算帧宽
 */
function Render(entityId, options) {
  const {
    img,
    height,
    frames,
    frameInterval,
    flip = false
  } = options;

  const width = img.width / frames; // ✅ 自动根据帧数计算单帧宽

  addComponent(entityId, 'Render', {
    img,
    width,
    height,
    frames,
    frameInterval,
    frameTimer: 0,
    frameIndex: 0,
    flip
  });
}

module.exports = Render;
