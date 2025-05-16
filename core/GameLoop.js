// core/GameLoop.js
const { drawHook } = require('../objects/Hook.js');
const { getTransformedShape, polygonsIntersect } = require('../utils/Collision.js');
const { hookShape } = require('../utils/Shapes.js');
const { drawPolygon } = require('../utils/DrawPolygon.js');
const {
  attachFish,
  updateAttachedFish,
  drawAttachedFish
} = require('../components/HookAttachment.js');

let animationFrameId = null;

function gameLoop(ctx, state, assets, constants, debug) {
  const now = Date.now();
  const deltaTime = (now - (state.lastTime || now)) / 1000;
  state.lastTime = now;

  const hook = state.hook;
  const cameraY = state.bgY;

  const hookSpeed = (hook.x - (state.lastHookX || hook.x)) / deltaTime;
  state.lastHookX = hook.x;

  ctx.clearRect(0, 0, constants.screenWidth, constants.screenHeight);

  const bgImg = assets.backgroundImg;
  const bgY = state.bgY;
  ctx.drawImage(bgImg, 0, -bgY % bgImg.height);
  ctx.drawImage(bgImg, 0, (-bgY % bgImg.height) + bgImg.height);

  ctx.fillStyle = 'white';
  ctx.font = '16px sans-serif';
  ctx.fillText(`深度：${Math.floor(state.bgY)} 米`, 10, 20);

  state.bgY += constants.bgSpeed * deltaTime;

  state.fishList.forEach(fish => {
    if (fish.isHooked) return;

    fish.updateMovement(deltaTime, constants.screenWidth);
    fish.render(ctx, cameraY, fish.dirX);

    if (debug) {
      const fishPoly = fish.getCollisionShape().map(p => ({ x: p.x, y: p.y - cameraY }));
      drawPolygon(ctx, fishPoly, 'green');
    }

    const fishPoly = fish.getCollisionShape().map(p => ({ x: p.x, y: p.y - cameraY }));
    const hookPoly = getTransformedShape(hookShape, hook.x, hook.y);

    if (polygonsIntersect(fishPoly, hookPoly)) {
      attachFish(hook, fish);
    }
  });

  updateAttachedFish(hook, hookSpeed, deltaTime);
  drawHook(ctx, hook, assets.hookImg, constants.drawW, constants.drawH, constants.hookVisualOffset, debug);
  drawAttachedFish(ctx, hook, cameraY);

  // 暂停按钮
  const pauseBtnX = constants.screenWidth - 100 - 10;
  const pauseBtnY = 80;
  const pauseBtnW = 100;
  const pauseBtnH = 50;

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(pauseBtnX, pauseBtnY, pauseBtnW, pauseBtnH);

  ctx.fillStyle = 'white';
  ctx.font = '20px sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(state.isPaused ? '▶️ 继续' : '⏸ 暂停', pauseBtnX + pauseBtnW / 2, pauseBtnY + pauseBtnH / 2);
// 加在暂停按钮下方
const restartBtnX = constants.screenWidth - 100 - 10;
const restartBtnY = 140;
const restartBtnW = 100;
const restartBtnH = 40;

ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
ctx.fillRect(restartBtnX, restartBtnY, restartBtnW, restartBtnH);

ctx.fillStyle = 'white';
ctx.font = '16px sans-serif';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('🔁 重开', restartBtnX + restartBtnW / 2, restartBtnY + restartBtnH / 2);

  if (state.isPaused) return; // ✅ 精简控制，只要暂停就不继续调用

  animationFrameId = requestAnimationFrame(() =>
    gameLoop(ctx, state, assets, constants, debug)
  );
}

function startGameLoop(ctx, state, assets, constants, debug) {
  if (!animationFrameId) {
    state.lastTime = Date.now();
    animationFrameId = requestAnimationFrame(() =>
      gameLoop(ctx, state, assets, constants, debug)
    );
  }
}

function stopGameLoop() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
}

module.exports = { startGameLoop, stopGameLoop };
