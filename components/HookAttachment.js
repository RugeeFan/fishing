// components/HookAttachment.js
function attachFish(hook, fish) {
  if (fish.isHooked) return;

  fish.isHooked = true;
  fish.initialSwingAngle = 0;
  fish.localAngle = 0;
  fish.localVelocity = 0;

  hook.attachedFishes.push(fish);

  console.log(`🎣 Fish [${fish.name}] hooked`);
}

function updateAttachedFish(hook, hookSpeed = 0, deltaTime = 1 / 60) {
  for (const fish of hook.attachedFishes || []) {
    const externalForce = hookSpeed * 0.02;

    const target = 0;
    const stiffness = 50;
    const damping = 6;

    const f = externalForce - stiffness * (fish.localAngle - target) - damping * fish.localVelocity;
    fish.localVelocity += f * deltaTime;
    fish.localAngle += fish.localVelocity * deltaTime;
  }
}

function drawAttachedFish(ctx, hook, cameraY) {
  if (!hook.attachedFishes || hook.attachedFishes.length === 0) return;

  for (let i = 0; i < hook.attachedFishes.length; i++) {
    const fish = hook.attachedFishes[i];

    const width = fish.width || 40;
    const height = fish.height || 20;
    const angle = fish.localAngle || 0;

    const offsetRatio = fish.hookOffsetRatio || { x: 0, y: 0.9 };
    const offsetX = offsetRatio.x * width;
    const offsetY = offsetRatio.y * height;

    const x = hook.x + offsetX;
    const y = hook.y + offsetY;

    const img = fish.img;
    const frameW = img.width / 2;
    const frameH = img.height / fish.frames;
    const frameIndex = fish.hookFrameIndex || 0;
    const col = fish.dirX === 1 ? 0 : 1;
    const sx = col * frameW;
    const sy = frameIndex * frameH;

    ctx.save();
    ctx.translate(x, y);

    const baseRotation = fish.dirX === 1 ? -Math.PI / 2 : Math.PI / 2;
    ctx.rotate(baseRotation + angle);

    const anchorY = fish.anchorYRatio ?? 1;
    ctx.translate(-width / 2, -height * anchorY);

    ctx.drawImage(
      img,
      sx, sy, frameW, frameH,
      0, 0, width, height
    );

    // 🟡 调试锚点位置
    ctx.fillStyle = 'yellow';
    ctx.beginPath();
    ctx.arc(0, 0, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }
}

module.exports = {
  attachFish,
  updateAttachedFish,
  drawAttachedFish,
};
