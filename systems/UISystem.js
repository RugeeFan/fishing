// systems/UISystem.js

let listenerBound = false; // ✅ 防止重复绑定

function UISystemFactory(canvas, ctx, { gameWorld, initGame }) {
  const pauseBtn = {
    x: canvas.width - 110,
    y: 20,
    w: 90,
    h: 40,
    label: () => gameWorld.paused ? '▶️ 继续' : '⏸ 暂停',
    onClick: () => gameWorld.togglePause()
  };

  const restartBtn = {
    x: canvas.width - 110,
    y: 70,
    w: 90,
    h: 40,
    label: () => '🔁 重开',
    onClick: () => {
      gameWorld.reset();
      if (initGame) initGame(); // ✅ 会触发重新注册系统
    }
  };

  const buttons = [pauseBtn, restartBtn];

  if (!listenerBound) {
    canvas.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      const x = touch.clientX;
      const y = touch.clientY;

      for (const btn of buttons) {
        if (x >= btn.x && x <= btn.x + btn.w && y >= btn.y && y <= btn.y + btn.h) {
          btn.onClick();
        }
      }
    });

    listenerBound = true; // ✅ 确保只绑定一次
  }

  return function UISystem(dt) {
    for (const btn of buttons) {
      ctx.fillStyle = 'rgba(0,0,0,0.5)';
      ctx.fillRect(btn.x, btn.y, btn.w, btn.h);

      ctx.fillStyle = 'white';
      ctx.font = '16px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(btn.label(), btn.x + btn.w / 2, btn.y + btn.h / 2);
    }
  };
}

module.exports = UISystemFactory;
