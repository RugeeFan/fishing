// data/fishData.js

module.exports = [
  {
    name: "redFish",
    image: "assets/images/fish-red.png",
    size: { width: 52, height: 22 },
    animation: {
      frames: 3,
      frameInterval: 0.2,
      direction: 1
    },
    movement: {
      speedX: 40,
      dirX: 1,
      xRange: { min: 100, max: 300 },
      depthRange: { min: 100, max: 400 } // ✅ 更靠近视口
    }
  },

  {
    name: "blueFish",
    image: "assets/images/fish-blue.png",
    size: { width: 60, height: 24 },
    animation: {
      frames: 2,
      frameInterval: 0.25,
      direction: -1
    },
    movement: {
      speedX: 50,
      dirX: -1,
      xRange: { min: 150, max: 350 },
      depthRange: { min: 700, max: 1000 }
    }
  }
];
