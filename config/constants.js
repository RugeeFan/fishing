//config/constants.js

const BASE_WIDTH = 375;
const BASE_HEIGHT = 667;
const screenWidth = wx.getSystemInfoSync().windowWidth;
const screenHeight = wx.getSystemInfoSync().windowHeight;
const designDrawW = 53.6;
const designDrawH = 71.6;
const drawW = screenWidth * (designDrawW / BASE_WIDTH);
const drawH = screenHeight * (designDrawH / BASE_HEIGHT);
const designOffsetX = 21;
const designOffsetY = 18;
const hookVisualOffset = {
  x: -drawW / 2 + (screenWidth * (designOffsetX / BASE_WIDTH)),
  y: -drawH + (screenHeight * (designOffsetY / BASE_HEIGHT))
};
const bgSpeed = 200;
const DEBUG_MODE= true;
module.exports = {
  BASE_WIDTH,
  BASE_HEIGHT,
  DEBUG_MODE,
  screenWidth,
  screenHeight,
  designDrawW,
  designDrawH,
  drawW,
  drawH,
  designOffsetX,
  designOffsetY,
  hookVisualOffset,
  bgSpeed
};
