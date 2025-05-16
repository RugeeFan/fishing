// entities/createFish.js
const { createEntity } = require('../EntityManager');
const Position = require('../components/Position');
const Render = require('../components/Render');
const Movement = require('../components/Movement');
const Collision = require('../components/CollisionComponent');

function createFish({
  x, y,
  img,
  width,
  height,
  frames,
  frameInterval,
  speedX,
  dirX,
  shape,
  xRange,
  imageOffsetXRatio = 0,
  imageOffsetYRatio = 0,
  shapeOffsetXRatio = 0,
  shapeOffsetYRatio = 0,
  name = 'unknown',
  hookFrameIndex = 0,
  hookOffsetRatio = { x: 0, y: 0.9 },
  anchorYRatio = 1,
}) {
  const fish = createEntity(
    Position(x, y),
    Render(img, width, height, frames, frameInterval),
    Collision(shape),
    Movement(speedX, dirX, xRange, width)
  );

  fish.img = img;
  fish.width = width;
  fish.height = height;
  fish.name = name;

  fish.imageOffsetXRatio = imageOffsetXRatio;
  fish.imageOffsetYRatio = imageOffsetYRatio;
  fish.shapeOffsetXRatio = shapeOffsetXRatio;
  fish.shapeOffsetYRatio = shapeOffsetYRatio;
  fish.hookFrameIndex = hookFrameIndex || 0;
  fish.hookOffsetRatio = hookOffsetRatio;
  fish.anchorYRatio = anchorYRatio;

  return fish;
}

module.exports = createFish;





