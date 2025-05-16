// data/fishData.js
module.exports = [
  {
    name: "demoFish",
    image: "assets/images/demo-fish.png",
    width: 52,
    height: 22,
    frames: 3,
    frameInterval: 0.15,
    speedX: 100,
    dirX: 1,
    movementType: "horizontal",
    shape: "demoFishShape",
    depthRange: { min: 1000, max: 1500 },
    xRange: { min: 100, max: 300 },
    imageOffsetXRatio: -0.1,
    imageOffsetYRatio: -0.1,
    shapeOffsetXRatio: 0,
    shapeOffsetYRatio: 0,
    hookFrameIndex: 1,
    hookOffsetRatio: { x: 0, y: 0.9 },  // ✅ 鱼在钩子上的偏移位置（比例）
    anchorYRatio: 1                     // ✅ 鱼图像内旋转锚点（比例）
  },
  {
    name: "redFish",
    image: "assets/images/fish-red.png",
    width: 60,
    height: 25,
    frames: 3,
    frameInterval: 0.15,
    speedX: 40,
    dirX: -1,
    movementType: "horizontal",
    shape: "redFishShape",
    depthRange: { min: 3000, max: 5000 },
    xRange: { min: 100, max: 350 },
    imageOffsetXRatio: -0.1,
    imageOffsetYRatio: -0.1,
    shapeOffsetXRatio: 0,
    shapeOffsetYRatio: 0,
    hookFrameIndex: 1,
    hookOffsetRatio: { x: 0, y: 0.9 },
    anchorYRatio: 1
  }
];


