class Menu {
  constructor() {
    this.interval = 0;
    this.innermenuinterval = 0;
  }
  addMenu() {
    this.addFixedBackground(document.body);
    this.menu = document.createElement("div");
    this.menu.classList = "menu";
    game.add(this.menu);
    this.addSpacing(this.menu, "Battle offline against each other or the computer");
    this.addButton(this.menu, "Games & More", "linear-gradient(to bottom left, #000099, blue)", "menu", "Create custom maps", "/images/menu/games-and-more-menu.webp");
    this.addButton(this.menu, "Smash", "linear-gradient(to bottom right, #990000, red)", "menu", "Battle offline against each other or the computer", "/images/menu/smash-ball-menu.webp");
    this.addButton(this.menu, "Vault", "linear-gradient(to left, #AA336A, pink)", "menu", "View your stats, characters, and game settings", "/images/menu/vault-menu.webp");
    this.addButton(this.menu, "Spirits", "linear-gradient(to top right, #004c00, green)", "menu", "Unlock more spirits to be used in the game", "/images/menu/spirits-menu.webp");
    this.addButton(this.menu, "Online", "linear-gradient(to top left, orange, yellow)", "menu", "Battle online against other people", "/images/menu/online-menu.webp");
    this.addImage(this.menu, "/images/menu/ssbu-menu.webp");
    this.addPointer(this.menu);
    this.addInnerMenu("games", [
      { text: "Stage builder", func: null },
      { text: "Home-run contest", func: null },
    ]);
    this.addInnerMenu("smash", [
      { text: "Play game", func: playGameOffline },
      { text: "Tourney", func: null },
    ]);
    this.addInnerMenu("vault", [
      { text: "Sounds", func: null },
      { text: "Shop", func: null },
      { text: "Stats", func: null },
    ]);
    this.addInnerMenu("spirits", [
      { text: "Adventure", func: null },
      { text: "Collection", func: null },
    ]);
    this.addInnerMenu("online", [
      { text: "Smash", func: playGameOnline },
      { text: "Spectate", func: null },
    ]);
    const sidebarIcons = [
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>`,
        func: backToMenu,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
              </svg>`,
        func: null,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                <path fill-rule="evenodd" d="M11.828 2.25c-.916 0-1.699.663-1.85 1.567l-.091.549a.798.798 0 01-.517.608 7.45 7.45 0 00-.478.198.798.798 0 01-.796-.064l-.453-.324a1.875 1.875 0 00-2.416.2l-.243.243a1.875 1.875 0 00-.2 2.416l.324.453a.798.798 0 01.064.796 7.448 7.448 0 00-.198.478.798.798 0 01-.608.517l-.55.092a1.875 1.875 0 00-1.566 1.849v.344c0 .916.663 1.699 1.567 1.85l.549.091c.281.047.508.25.608.517.06.162.127.321.198.478a.798.798 0 01-.064.796l-.324.453a1.875 1.875 0 00.2 2.416l.243.243c.648.648 1.67.733 2.416.2l.453-.324a.798.798 0 01.796-.064c.157.071.316.137.478.198.267.1.47.327.517.608l.092.55c.15.903.932 1.566 1.849 1.566h.344c.916 0 1.699-.663 1.85-1.567l.091-.549a.798.798 0 01.517-.608 7.52 7.52 0 00.478-.198.798.798 0 01.796.064l.453.324a1.875 1.875 0 002.416-.2l.243-.243c.648-.648.733-1.67.2-2.416l-.324-.453a.798.798 0 01-.064-.796c.071-.157.137-.316.198-.478.1-.267.327-.47.608-.517l.55-.091a1.875 1.875 0 001.566-1.85v-.344c0-.916-.663-1.699-1.567-1.85l-.549-.091a.798.798 0 01-.608-.517 7.507 7.507 0 00-.198-.478.798.798 0 01.064-.796l.324-.453a1.875 1.875 0 00-.2-2.416l-.243-.243a1.875 1.875 0 00-2.416-.2l-.453.324a.798.798 0 01-.796.064 7.462 7.462 0 00-.478-.198.798.798 0 01-.517-.608l-.091-.55a1.875 1.875 0 00-1.85-1.566h-.344zM12 15.75a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" clip-rule="evenodd" />
              </svg>`,
        func: null,
      },
      {
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="icon">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 01-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 01-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 01-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584zM12 18a.75.75 0 100-1.5.75.75 0 000 1.5z" clip-rule="evenodd" />
              </svg>`,
        func: null,
      },
    ];
    this.addSidebar(sidebarIcons);

    document.querySelector("#sidebar-pointer").style.top = getOffset(document.querySelector("#sidebar-icon-0")).top - 2 + "px";
  }
  addButton(elmnt, text, color = "red", type = "normal", spacingText = "", src = "", func = null) {
    const button = document.createElement("div");
    button.style.background = color;
    button.classList = type + "-button";
    button.id = type + "-button-" + this.interval;
    if (button.id === "menu-button-1") {
      setTimeout(() => rotatePointer(button), 1);
    }
    if (type === "menu") {
      button.addEventListener("mouseover", () => rotatePointer(button));
      button.onmouseup = () => closeMenu(button.id);
      button.onmouseover = () => changeSpacingText(spacingText);
    }
    if (type === "inner-menu") {
      button.onmouseup = func;
    }
    this.interval++;
    const img = document.createElement("img");
    img.src = src;
    button.appendChild(img);
    const innerText = document.createElement("div");
    innerText.innerText = text;
    button.appendChild(innerText);
    elmnt.appendChild(button);
  }
  addImage(elmnt, src) {
    const container = document.createElement("div");
    container.classList = "menu-img";
    const img = document.createElement("img");
    img.src = src;
    container.appendChild(img);
    elmnt.appendChild(container);
  }
  addSpacing(elmnt, text = "") {
    const spacing = document.createElement("div");
    spacing.innerText = text;
    spacing.classList = "spacing";
    elmnt.appendChild(spacing);
  }
  addFixedBackground(elmnt) {
    const background = document.createElement("div");
    background.classList = "fixed-background";
    elmnt.appendChild(background);
  }
  addPointer(elmnt) {
    const pointer = document.createElement("div");
    pointer.classList = elmnt.classList + "-pointer";
    elmnt.appendChild(pointer);
  }
  addBackButton(elmnt, func) {
    const backButton = document.createElement("div");
    backButton.onmouseup = func;
    backButton.id = "back-to-menu";
    backButton.classList = "back-to-" + elmnt.id;
    backButton.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" />
      </svg>
    `;
    elmnt.appendChild(backButton);
  }
  addSidebar(icons) {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";
    game.add(sidebar);
    for (var i = 0; i < icons.length; i++) {
      const icon = document.createElement("div");
      icon.innerHTML = icons[i].icon;
      icon.onmouseup = icons[i].func;
      icon.id = "sidebar-icon-" + i;
      icon.onmousedown = sidebarPointerTo;
      sidebar.appendChild(icon);
    }
    const pointer = document.createElement("div");
    pointer.id = "sidebar-pointer";
    sidebar.appendChild(pointer);
    const time = document.createElement("div");
    time.id = "sidebar-time";
    sidebar.appendChild(time);
    setInterval(updateTime, 100);
  }
  addInnerMenu(to, buttons) {
    const innerMenu = document.createElement("div");
    innerMenu.id = to;
    innerMenu.classList = "inner-menu";
    game.add(innerMenu);
    this.addBackButton(innerMenu, backToMenu);
    const color = document.querySelector("#menu-button-" + this.innermenuinterval).style.background.replace(/rgba?(\(\s*\d+\s*,\s*\d+\s*,\s*\d+)(?:\s*,.+?)?\)/, '').split(", ")[2].replace(")", "");
    this.innermenuinterval++;
    for (var i = 0; i < buttons.length; i++) {
      this.addButton(innerMenu, buttons[i].text, color, "inner-menu", "", "", buttons[i].func);
    }
  }
}

class Game {
  constructor() {
    this.game = document.createElement("div");
    this.game.id = "gameUI";
    document.body.appendChild(this.game);
  }
  add(child) {
    this.game.appendChild(child);
  }
}

const ui = new Menu();
const game = new Game();
const splashScreen = new SplashScreen();
const mapSelect = new MapSelect();
const playerSelect = new PlayerSelect();
var currNum;
var max;
var rot;
var type;

function closeMenu(button) {
  max = ui.interval;

  document.querySelector(".fixed-background").style.background = document.querySelector("#" + button).style.background;

  type = document.getElementById(button).innerText.toLowerCase().replace(/ .*/, '');

  document.querySelector("#" + type).style.opacity = 1;
  document.querySelector("#" + type).style.scale = 1;
  document.querySelector("#" + type).style.rotate = "0deg";
  document.querySelector("#" + type).style.pointerEvents = "auto";
  document.querySelector("#sidebar").style.right = 0;
  document.querySelector("#map-select").style.opacity = 0;

  var element = document.getElementById(button);
  var x = window.innerWidth / 2 - (getOffset(element).left + getOffset(element).width / 2);
  var y = window.innerHeight / 2 - (getOffset(element).top + getOffset(element).height / 2);
  currNum = parseInt(button[button.length - 1]);
  document.querySelector(".menu").style.transform = "translate(" + x + "px, " + y + "px)";
  document.querySelector(".menu").style.rotate = "-45deg";
  document.querySelector(".menu").style.scale = 3;
  document.querySelector(".menu").style.opacity = 0;
  document.querySelector(".menu").style.pointerEvents = "none";

  document.querySelector(".back-to-" + type).style.left = 0;
}

function backToMenu() {
  document.querySelector(".fixed-background").style.background = "black";

  document.querySelector(".menu").style.transform = "translate(0px, 0px)";
  document.querySelector(".menu").style.rotate = "0deg";
  document.querySelector(".menu").style.scale = 1;
  document.querySelector(".menu").style.opacity = 1;
  document.querySelector(".menu").style.pointerEvents = "auto";

  document.querySelector("#" + type).style.opacity = 0;
  document.querySelector("#" + type).style.scale = 0;
  document.querySelector("#" + type).style.rotate = "45deg";
  document.querySelector("#" + type).style.pointerEvents = "none";

  document.querySelector(".back-to-" + type).style.left = "-100%";
}

function changeSpacingText(text) {
  document.querySelector(".spacing").innerText = text;
}

function getOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    left: rect.left + window.scrollX,
    top: rect.top + window.scrollY,
    width: rect.width,
    height: rect.height,
  };
}

function rotatePointer(element) {
  const buttonX = getOffset(element).left + getOffset(element).width / 2;
  const buttonY = getOffset(element).top + getOffset(element).height / 2;
  const pointerX = getOffset(document.querySelector(".menu-pointer")).left + getOffset(document.querySelector(".menu-pointer")).width / 2;
  const pointerY = getOffset(document.querySelector(".menu-pointer")).top + getOffset(document.querySelector(".menu-pointer")).height / 2;

  var deg = (-Math.atan2(buttonX - pointerX, buttonY - pointerY) * 180 / Math.PI) + 180;

  const menuButtons = document.querySelectorAll(".menu-button");
  menuButtons.forEach(button => {
    button.classList.remove("menu-button-hover");
  });
  element.classList.add("menu-button-hover");

  if (deg < 0) deg = 360 + deg;
  var aR;
  rot = rot || 0;
  aR = rot % 360;
  if (aR < 0) aR += 360;
  if (aR < 180 && (deg > (aR + 180))) rot -= 360;
  if (aR >= 180 && (deg <= (aR - 180))) rot += 360;
  rot += (deg - aR);
  document.querySelector(".menu-pointer").style.transform = "rotate(" + rot + "deg)";
}

function updateTime() {
  const date = new Date();
  const time = document.querySelector("#sidebar #sidebar-time");
  var hours = date.getHours();
  var minutes = date.getMinutes();
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  time.innerText = `${hours}:${minutes}`;
}

function sidebarPointerTo() {
  document.querySelector("#sidebar-pointer").style.top = getOffset(this).top - 2 + "px";
}

function loadMapSelect(elmnt) {
  elmnt.parentElement.style.opacity = 0;
  elmnt.parentElement.style.pointerEvents = "none";
  document.querySelector("#sidebar").style.right = "-100%";
  setTimeout(() => {
    document.querySelector(".fixed-background").style.background = "black";
    mapSelect.select.style.opacity = 1;
  }, 1000);
  showLoader("#map-select");
}

function playGameOffline() {
  players[myId].currentMap = "";
  players[myId].status = "offline";
  
  const maps = [];
  const mapNames = ["Battlefield", "Big Battlefield", "Final Destination", "Kongo Jungle", "Hyrule Castle", "Super Happy Tree", "Dream Land", "Saffron City", "Mushroom Kingdom", "Princess Peach's Castle", "Rainbow Cruise", "Kongo Falls", "Jungle Japes", "Great Bay", "Temple", "Brinstar", "Yoshi's Island (Melee)", "Yoshi's Story", "Fountain of Dreams", "Green Greens", "Corneria", "Venom", "Pok\u00e9mon Stadium", "Onett", "Mushroom Kingdom II", "Brinstar Depths", "Big Blue", "Fourside", "Delfino Plaza", "Mushroomy Kingdom", "Figure-8 Circuit", "WarioWare Inc.", "Bridge of Eldin", "Norfair", "Frigate Orpheon", "Yoshi's Island", "Halberd", "Lylat Cruise", "Pok\u00e9mon Stadium 2", "Port Town Aero Dive", "Castle Siege", "Distant Planet", "Smashville", "New Pork City", "Summit", "Skyworld", "Shadow Moses Island", "Luigi's Mansion", "Pirate Ship", "Spear Pillar", "75 m", "Mario Bros.", "Hanenbow", "Green Hill Zone", "3D Land", "Golden Plains", "Paper Mario", "Gerudo Valley", "Spirit Train", "Dream Land GB", "Unova Pok\u00e9mon League", "Prism Tower", "Mute City SNES", "Magicant", "Arena Ferox", "Reset Bomb Forest", "Tortimer Island", "Balloon Fight", "Living Room", "Find Mii", "Tomodachi Life", "PictoChat 2", "Mushroom Kingdom U", "Mario Galaxy", "Mario Circuit", "Skyloft", "The Great Cave Offensive", "Kalos Pok\u00e9mon League", "Coliseum", "Flat Zone X", "Palutena's Temple", "Gamer", "Garden of Hope", "Town and City", "Wii Fit Studio", "Boxing Ring", "Gaur Plain", "Duck Hunt", "Wrecking Crew", "Pilotwings", "Wuhu Island", "Windy Hill Zone", "Wily Castle", "PAC-LAND", "Super Mario Maker", "Suzaku Castle", "Midgar", "Umbra Clock Tower", "New Donk City Hall", "Great Plateau Tower", "Moray Towers", "Dracula's Castle", "Saffron City"];
  var i = 0;

  mapNames.forEach(map => {
    maps[maps.length] = {
      src: "/images/stage-images/" + (i + 1) + ".webp",
      map,
    };
    i++;
  });

  mapSelect.addMaps(maps);
  mapSelect.addBackButton(() => closeMenu("menu-button-1"));
  loadMapSelect(this);
}

function playGameOnline() {
  players[myId].currentMap = "";
  players[myId].status = "online";
}

function chooseColor(l) {
  if (l == 1) {
    return "red";
  } else if (l == 2) {
    return "blue";
  } else if (l == 3) {
    return "yellow";
  } else if (l == 4) {
    return "green";
  } else if (l == 5) {
    return "orange";
  } else if (l == 6) {
    return "cyan";
  } else if (l == 7) {
    return "pink";
  } else if (l == 8) {
    return "violet";
  }
};