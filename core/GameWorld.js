// core/GameWorld.js

const EntityManager = require('./EntityManager');

const GameWorld = {
  systems: [],
  lastTime: Date.now(),
  paused: false,

  registerSystem(system) {
    this.systems.push(system);
  },

  update() {
    if (this.paused) return; // ✅ 加这一行，暂停时完全停止所有系统运行

    const now = Date.now();
    const deltaTime = (now - this.lastTime) / 1000;
    this.lastTime = now;

    for (const system of this.systems) {
      system(deltaTime);
    }
  },

  togglePause() {
    this.paused = !this.paused;
    this.lastTime = Date.now(); // ✅ 避免恢复后 deltaTime 激增
    console.log(this.paused ? '⏸️ 游戏已暂停' : '▶️ 游戏继续');
  },

  reset() {
    this.paused = false;
    this.systems = [];               // ✅ 清空系统，防止重复注册
    EntityManager.reset();
    this.lastTime = Date.now();
    console.log('🔁 游戏世界已重置');
  }
};

module.exports = GameWorld;
