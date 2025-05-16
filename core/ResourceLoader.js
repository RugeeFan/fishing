//core/ResourceLoader.js


function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = wx.createImage();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

module.exports = { loadImage };
