// components/Render.js

module.exports = (img, width, height, frames = 3, frameInterval = 0.15) => ({
  img,
  width,
  height,
  frames,
  frameIndex: 0,
  frameTimer: 0,
  frameInterval,

  render(ctx, cameraY, dirX) {
    const frameW = this.img.width / 2;
    const frameH = this.img.height / this.frames;
    const col = dirX === 1 ? 0 : 1;
    const sx = col * frameW;
    const sy = this.frameIndex * frameH;
    const renderY = this.y - cameraY;

    const offsetX = (this.imageOffsetXRatio || 0) * this.width;
    const offsetY = (this.imageOffsetYRatio || 0) * this.height;

    ctx.drawImage(
      this.img,
      sx, sy, frameW, frameH,
      this.x + offsetX,
      renderY + offsetY,
      this.width, this.height
    );
  }
});
