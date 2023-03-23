class PlayerSelect {
  constructor() {
    this.select = document.createElement("div");
    this.select.id = "player-select";
    game.add(this.select);
    this.addContainer("players");
    this.addContainer("preview");
  }
  add(elmnt) {
    this.select.appendChild(elmnt);
  }
  addBackButton(func) {
    const backButton = document.createElement("div");
    backButton.onmouseup = func;
    backButton.id = "back-to-map-select";
    backButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    `;
    this.select.appendChild(backButton);
  }
  addPlayers(data) {
    this.players = data;
    document.querySelector("#player-select-inner-container").innerHTML = "";
    var i = 0;
    this.players.forEach(player => {
      if (i === this.players.length - this.players.length % 13) {
        for (var x = 0; x < (13 - this.players.length % 13) / 2; x++) {
          this.addSpacer();
        }
      }
      const container = document.createElement("div");
      container.id = "player";
      container.classList = "player-" + i;
      container.onmouseup = choosePlayer;
      container.onmouseover = changePlayer;
      container.onmouseleave = cancelPlayer;
      const img = document.createElement("img");
      loadImage(player.src, img, null, true);
      const text = document.createElement("div");
      text.innerText = player.character.toUpperCase().replace("II", "ii");
      text.id = "player-text";
      container.appendChild(img);
      container.appendChild(text);
      document.querySelector("#player-select-inner-container").appendChild(container);
      i++;
    });
    for (var i = 0; i < (13 - this.players.length % 13) / 2; i++) {
      this.addSpacer();
    }
  }
  addPlayerSpot(player) {
    if (player.num > 8) return;
    const container = document.createElement("div");
    container.id = "container";
    container.classList = "spot-" + player.num;
    document.querySelector("#player-select-preview-container").appendChild(container);
    const spot = document.createElement("div");
    spot.id = "spot";
    container.appendChild(spot);
    const image = document.createElement("img");
    image.id = "player-img";
    spot.appendChild(image);
    const shadow = document.createElement("div");
    spot.appendChild(shadow);
    shadow.id = "shadow";
    shadow.style.color = player.color;
    const color = window.getComputedStyle(shadow).color;
    if (player.color == "gray") spot.style.filter = "grayscale(1)";
    else spot.style.filter = "hue-rotate(" + calculateHue(color) + "deg)";
  }
  removePlayerSpot(num) {
    if (num < 3) return;
    document.querySelector(".spot-" + player.num).remove();
  }
  addSpacer() {
    const spacer = document.createElement("div");
    spacer.id = "player-select-spacer";
    document.querySelector("#player-select-inner-container").appendChild(spacer);
  }
  addContainer(type) {
    const container = document.createElement("div");
    container.id = "player-select-" + type + "-container";
    this.add(container);
    if (type === "players") {
      const innerContainer = document.createElement("div");
      innerContainer.id = "player-select-inner-container";
      container.appendChild(innerContainer);
    }
  }
}

function calculateHue(rgb) {
  const [r, g, b] = rgb.replace(/[^\d,]/g, "").split(",");
  return rgbToHsl(r, g, b)[0] * 360;
}

function rgbToHsl(r, g, b) {
  r /= 255, g /= 255, b /= 255;
  
  var max = Math.max(r, g, b), min = Math.min(r, g, b);
  var h, s, l = (max + min) / 2;

  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }

  return [h, s, l];
}

function choosePlayer() {
  players[myId].character = playerSelect.players[this.classList[0].replace(/\D/g, "")].character.replaceAll(" ", "").replaceAll(".", "").replaceAll("&", "And");
  // gameStarted = true;
}

function changePlayer() {
  this.style.outline = players[myId].color + " 5px solid";
}

function cancelPlayer() {
  this.style.outline = "black 1.5px solid";
}