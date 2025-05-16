// components/CollisionComponent.js

module.exports = (shape) => ({
  shape,

  getCollisionShape() {
    const offsetX = (this.shapeOffsetXRatio || 0) * this.width;
    const offsetY = (this.shapeOffsetYRatio || 0) * this.height;

    return this.shape.map(p => ({
      x: p.x + this.x + offsetX,
      y: p.y + this.y + offsetY,
    }));
  }
});
