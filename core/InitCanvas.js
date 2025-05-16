//core/InitCanvas.js


const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');
const screenWidth = canvas.width;
const screenHeight = canvas.height;

module.exports = { canvas, ctx, screenWidth, screenHeight };
