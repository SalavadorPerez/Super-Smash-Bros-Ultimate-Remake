function loadImage(src, elmnt, imgWidth, transition = false) {
  const c = document.createElement("canvas");
  const draw = c.getContext("2d");
  const img = new Image();
  img.src = src;
  img.onload = () => {
    const ratio = img.height / img.width;
    c.width = imgWidth || img.width;
    c.height = c.width * ratio;
    draw.drawImage(img, 0, 0, c.width, c.height);
    elmnt.src = c.toDataURL();
    if (!transition) return;
    elmnt.style.opacity = 1;
  }
}