class MapSelect {
  constructor() {
    this.compressionAmount = null;
    this.select = document.createElement("div");
    this.select.id = "map-select";
    game.add(this.select);
    this.addContainer("preview");
    this.addContainer("maps");
  }
  add(elmnt) {
    this.select.appendChild(elmnt);
  }
  addBackButton(func) {
    const backButton = document.createElement("div");
    backButton.onmouseup = func;
    backButton.id = "back-to-inner-menu";
    backButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    `;
    this.select.appendChild(backButton);
  }
  addMaps(data) {
    this.maps = data;
    document.querySelector("#map-select-maps-container").innerHTML = "";
    var i = 0;
    this.maps.forEach(map => {
      const container = document.createElement("div");
      container.id = "map";
      container.classList = "map-" + i;
      container.onmouseup = chooseMap;
      container.onmouseover = changePreviewMap;
      const img = document.createElement("img");
      loadImage(map.src, img, this.compressionAmount, true);
      img.id = "map-img-" + i;
      container.appendChild(img);
      document.querySelector("#map-select-maps-container").appendChild(container);
      i++;
    });
    const map = document.createElement("div");
    const img = document.createElement("img");
    const text = document.createElement("div");
    text.innerText = this.maps[0].map;
    text.id = "map-text";
    img.src = this.maps[0].src;
    img.id = "map-preview-img";
    map.appendChild(img);
    map.appendChild(text);
    document.querySelector("#map-select-preview-container").innerHTML = "";
    document.querySelector("#map-select-preview-container").appendChild(map);
  }
  addContainer(type) {
    const container = document.createElement("div");
    container.id = "map-select-" + type + "-container";
    this.add(container);
  }
}

function changePreviewMap() {
  document.querySelector("#map-text").innerText = mapSelect.maps[this.classList[0].replace(/\D/g, "")].map;
  document.querySelector("#map-preview-img").src = mapSelect.maps[this.classList[0].replace(/\D/g, "")].src;
}

function chooseMap() {
  players[myId].character = "";
  const portraits = [];
  const portraitNames = ["Mario", "Luigi", "Peach", "Bowser", "Yoshi", "Rosalina & Luma", "Donkey Kong", "Diddy Kong", "Link", "Zelda", "Sheik", "Toon Link", "Samus", "Zero Suit Samus", "Pit", "Palutena", "Marth", "Ike", "Robin", "Kirby", "King Dedede", "Meta Knight", "Little Mac", "Fox", "Pokemon Trainer", "Lucario", "Greninja", "Captain Falcon", "Villager", "Mega Man", "Olimar", "Wii Fit Trainer", "Shulk", "Pac Man", "Sonic", "Ness", "Falco", "Wario", "Lucina", "Young Link", "Dark Pit", "Dr. Mario", "Pichu", "R.O.B.", "Ganondorf", "Mr. Game & Watch", "Bowser Jr.", "Duck Hunt", "Jigglypuff", "Mewtwo", "Lucas", "Roy", "Chrom", "Ryu", "Cloud", "Corrin", "Bayonetta", "Snake", "Ice Climbers", "Inkling", "Ridley", "Daisy", "King K. Rool", "Dark Samus", "Young Link", "Simon", "Richter", "Pikachu", "Wolf", "Isabelle", "Incineroar", "Piranha Plant", "Ken", "Random"];
  
  portraitNames.forEach(character => {
    const src = "/images/profile-images/" + character.toLowerCase().replaceAll(".", "").replaceAll("&", "and").replaceAll(" ", "_") + ".webp";
    portraits[portraits.length] = {
      src,
      character,
    };
  });

  if (players[myId].status === "offline") {
    players[myId].num = 1;
    players[myId].color = chooseColor(players[myId].num);
    document.querySelector("#player-select-preview-container").innerHTML = "";
    playerSelect.addBackButton(playGameOffline);
    playerSelect.addPlayerSpot(players[myId]);
    playerSelect.addPlayerSpot(players[myId]);
  } else if (players[myId].status === "online") {
    playerSelect.addBackButton(playGameOnline);
  }
  playerSelect.addPlayers(portraits);
  document.querySelector("#map-select").style.pointerEvents = "none";
  players[myId].currentMap = mapSelect.maps[this.classList[0].replace(/\D/g, "")].map.replaceAll(" ", "");
  setTimeout(() => {
    document.querySelector("#map-select").style.opacity = 0;
    document.querySelector("#map-select").style.pointerEvents = "none";
    document.querySelector("#player-select").style.pointerEvents = "auto";
    document.querySelector("#player-select").style.opacity = 1;
  }, 500);
  showLoader("#player-select");
}