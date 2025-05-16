// objects/Hook.js
const { hookShape } = require('../utils/Shapes');
const { getTransformedShape } = require('../utils/Collision');
const { drawPolygon } = require('../utils/DrawPolygon');

// ✅ 默认图片绘制偏移比例
const imageOffsetXRatio = -0.05;
const imageOffsetYRatio = 0.01;

function drawHook(ctx, hook, img, drawW, drawH, offset, debug, cameraY = 0) {
  const offsetX = imageOffsetXRatio * drawW;
  const offsetY = imageOffsetYRatio * drawH;

  const drawX = hook.x + offset.x + offsetX;
  const drawY = hook.y + offset.y + offsetY;

  ctx.drawImage(img, drawX, drawY, drawW, drawH);

  if (debug) {
    const hookPoly = getTransformedShape(hookShape, hook.x, hook.y).map(p => ({
      x: p.x,
      y: p.y - cameraY
    }));
    drawPolygon(ctx, hookPoly, 'red');
  }
}

module.exports = { drawHook };
