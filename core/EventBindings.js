// core/EventBindings.js
const { canvas } = require('./InitCanvas.js');

const imageOffsetXRatio = -0.05;

function bindTouchMove(hook, drawW, offset, screenWidth) {
  canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];
    hook.x = touch.clientX - drawW / 2 - imageOffsetXRatio * drawW;

    const minX = -drawW / 2 - offset.x - imageOffsetXRatio * drawW;
    const maxX = screenWidth - drawW / 2 - offset.x - imageOffsetXRatio * drawW;

    if (hook.x < minX) hook.x = minX;
    if (hook.x > maxX) hook.x = maxX;
  });
}

// ✅ 防止重复绑定事件
let existingHandler = null;

function bindPauseToggle(canvas, getPause, setPause, restartGame, stopGame) {
  if (existingHandler) {
    canvas.removeEventListener('touchstart', existingHandler);
  }

  const handler = function (e) {
    const touch = e.touches[0];
    const x = touch.clientX;
    const y = touch.clientY;

    const pauseBtnTop = 80;
    const restartBtnTop = 140;
    const quitBtnTop = 200;
    const btnWidth = 100;
    const btnHeight = 50;

    if (x > canvas.width - btnWidth - 10 && y > pauseBtnTop && y < pauseBtnTop + btnHeight) {
      const current = getPause?.();
      setPause?.(!current);
    }

    if (x > canvas.width - btnWidth - 10 && y > restartBtnTop && y < restartBtnTop + btnHeight) {
      restartGame?.();
    }

    if (x > canvas.width - btnWidth - 10 && y > quitBtnTop && y < quitBtnTop + btnHeight) {
      stopGame?.();
    }
  };

  existingHandler = handler;
  canvas.addEventListener('touchstart', handler);
}

module.exports = { bindTouchMove, bindPauseToggle };