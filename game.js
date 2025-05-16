// game.js
const { canvas, ctx, screenWidth, screenHeight } = require('./core/InitCanvas.js');
const { loadImage } = require('./core/ResourceLoader.js');
const { bindTouchMove, bindPauseToggle } = require('./core/EventBindings.js');
const { startGameLoop, stopGameLoop } = require('./core/GameLoop.js');
const { initState } = require('./core/GameState.js');
const constants = require('./config/constants.js');
const fishData = require('./data/fishData');

let state;
let allAssets;

// 状态访问函数引用
let currentSetPause = () => {};
let currentGetPause = () => false;
let currentRestartGame = () => {};
let currentStopGame = () => {};

function getPause() {
  return state?.isPaused;
}

function setPause(v) {
  if (!state) return;
  state.isPaused = v;
  console.log('⏸️ 切换暂停状态:', v);
  if (v) {
    stopGameLoop();
  } else {
    startGameLoop(ctx, state, allAssets, constants, constants.DEBUG_MODE);
  }
}

function restartGame() {
  console.log('🔁 重开游戏');
  stopGameLoop();
  state = null;
  main();
}

function stopGame() {
  console.log('❌ 游戏终止');
  stopGameLoop();
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  state = null;
}

async function loadFishAssets() {
  const assets = {};
  for (const fish of fishData) {
    const key = `${fish.name}Img`;
    assets[key] = await loadImage(fish.image);
  }
  return assets;
}

async function main() {
  const hookImg = await loadImage('assets/images/hook.png');
  const backgroundImg = await loadImage('assets/images/background.png');
  const fishAssets = await loadFishAssets();

  allAssets = {
    hookImg,
    backgroundImg,
    ...fishAssets,
  };

  state = initState(screenWidth, screenHeight, allAssets);
  state.isPaused = false;

  currentGetPause = getPause;
  currentSetPause = setPause;
  currentRestartGame = restartGame;
  currentStopGame = stopGame;

  bindTouchMove(state.hook, constants.drawW, constants.hookVisualOffset, screenWidth);
  bindPauseToggle(
    canvas,
    () => currentGetPause(),
    (v) => currentSetPause(v),
    () => currentRestartGame(),
    () => currentStopGame()
  );

  startGameLoop(ctx, state, allAssets, constants, constants.DEBUG_MODE);
}

main();

module.exports = { getPause, setPause, restartGame, stopGame };