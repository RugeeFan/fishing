// components/Movement.js

module.exports = (speedX, dirX = 1, xRange = null, width = 0) => ({
  speedX,
  dirX,
  xRange,
  width,

  updateMovement(deltaTime) {
    this.x += this.speedX * deltaTime * this.dirX;

    const minX = this.xRange ? this.xRange.min : 0;
    const maxX = this.xRange ? this.xRange.max - this.width : wx.getSystemInfoSync().windowWidth - this.width;

    const epsilon = 0.1;

    if (this.x < minX - epsilon || this.x > maxX + epsilon) {
      this.dirX *= -1;

      // ✅ 修复位置，防止“贴边抖动”
      if (this.x < minX) this.x = minX;
      if (this.x > maxX) this.x = maxX;
    }

    this.frameTimer += deltaTime;
    if (this.frameTimer >= this.frameInterval) {
      this.frameTimer = 0;
      this.frameIndex = (this.frameIndex + 1) % this.frames;
    }
  }
});


