//utils/DrawPolygon.js

function drawPolygon(ctx, shape, color = 'red') {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(shape[0].x, shape[0].y);
  for (let i = 1; i < shape.length; i++) {
    ctx.lineTo(shape[i].x, shape[i].y);
  }
  ctx.closePath();
  ctx.stroke();
}

module.exports = { drawPolygon };