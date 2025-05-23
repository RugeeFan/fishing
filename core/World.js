// core/World.js

const World = {
  depthY: 0,
  speed: 60,
  paused: false,

  update(dt) {
    if (!this.paused) {
      this.depthY += this.speed * dt;
    }
  },

  reset() {
    this.depthY = 300; // ✅ 初始深度调低
  }
};

module.exports = World;
