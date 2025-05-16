//utils/Collision.js

function getTransformedShape(shape, offsetX, offsetY) {
  return shape.map(p => ({ x: p.x + offsetX, y: p.y + offsetY }));
}

function polygonsIntersect(polyA, polyB) {
  const polygons = [polyA, polyB];
  for (let i = 0; i < polygons.length; i++) {
    const polygon = polygons[i];
    for (let j = 0; j < polygon.length; j++) {
      const p1 = polygon[j];
      const p2 = polygon[(j + 1) % polygon.length];
      const normal = { x: p2.y - p1.y, y: p1.x - p2.x };

      let [minA, maxA] = projectPolygon(polyA, normal);
      let [minB, maxB] = projectPolygon(polyB, normal);

      if (maxA < minB || maxB < minA) return false;
    }
  }
  return true;
}

function projectPolygon(polygon, axis) {
  let min = null, max = null;
  for (let p of polygon) {
    const projected = p.x * axis.x + p.y * axis.y;
    if (min === null || projected < min) min = projected;
    if (max === null || projected > max) max = projected;
  }
  return [min, max];
}

module.exports = { getTransformedShape, polygonsIntersect };
