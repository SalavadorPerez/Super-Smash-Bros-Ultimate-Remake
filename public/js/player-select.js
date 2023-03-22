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
      text.innerText = player.character.toUpperCase();
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
    const shadow = document.createElement("div");
    spot.appendChild(shadow);
    shadow.id = "shadow";
    shadow.style.color = player.color;
    const color = window.getComputedStyle(shadow).color;
    shadow.style.background = color.replace("rgb", "rgba").replace(")", ", 0.7)");
    spot.style.background = "conic-gradient(from 0.75turn at 70% bottom, " + changeBrightness(color, 50) + " 12deg, " + changeBrightness(color, 25) + " 12deg 20deg, " + changeBrightness(color, 1) + " 20deg 40deg, " + changeBrightness(color, 70) + " 40deg 360deg)";
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

function changeBrightness(color, percent) {
  var ctx = document.createElement("canvas").getContext("2d");

  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1, 1);

  var color = ctx.getImageData(0, 0, 1, 1);
  var r = color.data[0] + Math.floor(percent / 100 * 255);
  var g = color.data[1] + Math.floor(percent / 100 * 255);
  var b = color.data[2] + Math.floor(percent / 100 * 255);

  return "rgb(" + r + ", " + g + ", " + b + ")";
}

function choosePlayer() {
  players[myId].character = playerSelect.players[this.classList[0].replace(/\D/g, "")].character.replaceAll(" ", "").replaceAll(".", "").replaceAll("&", "And");
  alert(players[myId].character);
  // gameStarted = true;
}

function changePlayer() {
  this.style.outline = players[myId].color + " 5px solid";
}

function cancelPlayer() {
  this.style.outline = "black 1.5px solid";
}