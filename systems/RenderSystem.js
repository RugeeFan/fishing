const { getComponent, getEntitiesWith } = require('../core/EntityManager');
const World = require('../core/World');
const GameWorld = require('../core/GameWorld'); // ✅ 添加这个

function RenderSystemFactory(ctx) {
  return function RenderSystem(dt) {
    if (GameWorld.paused) return; // ✅ 加这一句防止暂停时继续绘制和打印

    const Position = getComponent('Position');
    const Render = getComponent('Render');
    const ids = getEntitiesWith('Position', 'Render');

    for (const id of ids) {
      const pos = Position[id];
      const render = Render[id];

      render.frameTimer += dt;
      if (render.frameTimer >= render.frameInterval) {
        render.frameTimer = 0;
        render.frameIndex = (render.frameIndex + 1) % render.frames;
      }

      const drawX = pos.x;
      const drawY = pos.y - World.depthY;

      // console.log(`🎯 绘制实体 ${id} drawY=${drawY}`);

      ctx.save();

      if (render.flip) {
        ctx.translate(drawX + render.width / 2, drawY + render.height / 2);
        ctx.scale(-1, 1);
        ctx.translate(-render.width / 2, -render.height / 2);
      } else {
        ctx.translate(drawX, drawY);
      }

      const sx = render.frameIndex * render.width;

      if (render.img?.width > 0 && render.img?.height > 0) {
        ctx.drawImage(render.img, sx, 0, render.width, render.height, 0, 0, render.width, render.height);
        ctx.strokeStyle = 'lime';
        ctx.strokeRect(0, 0, render.width, render.height);
      } else {
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, render.width, render.height);
      }

      ctx.restore();
    }
  };
}

module.exports = RenderSystemFactory;
