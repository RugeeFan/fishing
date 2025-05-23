const GameWorld = require('./core/GameWorld');
const World = require('./core/World');

const BackgroundSystemFactory = require('./systems/BackgroundSystem');
const UISystemFactory = require('./systems/UISystem');
const RenderSystemFactory = require('./systems/RenderSystem');
const MovementSystem = require('./systems/MovementSystem');
const spawnFish = require('./spawner/FishSpawner');

// 创建 canvas
const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

function loadImage(src) {
  return new Promise(resolve => {
    const img = wx.createImage();
    img.src = src;
    img.onload = () => resolve(img);
  });
}

function initGame(assets) {
  World.reset();
  GameWorld.reset(); // ✅ 只保留这行

  const BackgroundSystem = BackgroundSystemFactory(ctx, assets.backgroundImg);
  const UISystem = UISystemFactory(canvas, ctx, {
    gameWorld: GameWorld,
    initGame: () => initGame(assets)
  });
  const RenderSystem = RenderSystemFactory(ctx);

  GameWorld.registerSystem(BackgroundSystem);
  GameWorld.registerSystem(UISystem);
  GameWorld.registerSystem(MovementSystem);
  GameWorld.registerSystem(RenderSystem);

  spawnFish(assets, 6); // 每种鱼生成 6 条
}

Promise.all([
  loadImage('assets/images/background.png'),
  loadImage('assets/images/fish-red.png'),
  loadImage('assets/images/fish-blue.png')
]).then(([bgImg, redFishImg, blueFishImg]) => {
  const assets = {
    backgroundImg: bgImg,
    redFishImg,
    blueFishImg
  };

  console.log('✅ 所有资源加载完成');
  initGame(assets); // ✅ 初始化游戏

  setInterval(() => {
    GameWorld.update();
  }, 1000 / 60);
});
