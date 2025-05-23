// systems/BackgroundSystem.js

const World = require('../core/World');
const GameWorld = require('../core/GameWorld'); // ✅ 改为使用 GameWorld

let backgroundImg = null;
let ctx = null;

function BackgroundSystemFactory(context, img) {
  ctx = context;
  backgroundImg = img;

  return function BackgroundSystem(dt) {
    if (!GameWorld.paused) { // ✅ 替换 GameStatus.paused
      World.update(dt);
    }

    const offsetY = World.depthY % backgroundImg.height;

    ctx.drawImage(backgroundImg, 0, -offsetY);
    ctx.drawImage(backgroundImg, 0, -offsetY + backgroundImg.height);

    // ✅ 显示当前深度
    ctx.fillStyle = 'white';
    ctx.font = '16px sans-serif';
    ctx.fillText(`深度：${Math.floor(World.depthY)} 米`, 10, 20);
  };
}

module.exports = BackgroundSystemFactory;
