class SplashScreen {
  constructor() {
    document.addEventListener("keypress", hideSplashScreen, false);
    this.splashscreen = document.createElement("div");
    this.splashscreen.id = "splash-screen";
    game.add(this.splashscreen);
    const container = document.createElement("div");
    container.id = "splash-screen-footer-container";
    this.add(container);
    this.addBackground("/images/splash-screen/background.gif");
    this.addFooter("PRESS ANY BUTTON", "red");
    this.addFooter("", "black");
    this.addFooter("Ver. 1.0.0", "rgba(0, 0, 0, 0)");
    this.addFooter("&copy;" + new Date().getFullYear() + " Super Smash Bros Ultimate Remake<br>This game is made only for fun and is not intended to steal anything from Nintendo&#8482;<br>All credit to Nintendo&#8482; for UI design.<br>Also, who ever reads these?");
    this.addLoader("/images/menu/smash-ball-menu.webp");
  }
  add(elmnt) {
    this.splashscreen.appendChild(elmnt);
  }
  addBackground(src) {
    const background = document.createElement("img");
    background.src = src;
    background.classList = "background";
    this.add(background);
  }
  addFooter(text, background = "black") {
    const footer = document.createElement("div");
    footer.id = "splash-screen-footer";
    footer.innerHTML = text;
    footer.style.background = background;
    document.querySelector("#splash-screen-footer-container").appendChild(footer);
  }
  addLoader(src) {
    const loader = document.createElement("div");
    loader.id = "loader";
    game.add(loader);
    const img = document.createElement("img");
    img.src = src;
    loader.appendChild(img);
    const spinner = document.createElement("div");
    loader.appendChild(spinner);
  }
}

function waitForElement(querySelector, timeout) {
  return new Promise((resolve, reject) => {
    var timer = false;
    if (document.querySelectorAll(querySelector).length) return resolve();
    const observer = new MutationObserver(() => {
      if (document.querySelectorAll(querySelector).length) {
        observer.disconnect();
        if (timer !== false) clearTimeout(timer);
        return resolve();
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
    if (timeout) timer = setTimeout(() => {
      observer.disconnect();
      reject();
    }, timeout);
  });
}

function hideSplashScreen(e) {
  if (e.ctrlKey || e.altKey || e.shiftKey) return;
  document.removeEventListener("keypress", hideSplashScreen);
  splashScreen.splashscreen.style.filter = "brightness(0%)";
  ui.addMenu();
  setTimeout(() => splashScreen.splashscreen.innerHTML = "", 1000);
  showLoader(".menu");
}

function showLoader(elmnt) {
  document.querySelector(elmnt).style.pointerEvents = "none";
  splashScreen.splashscreen.style.opacity = 1;
  setTimeout(() => {
    document.querySelector("#loader").style.opacity = 1;
  }, 400);

  setTimeout(() => waitForElement(elmnt, 3000).then(() => {
    document.querySelector("#loader").style.opacity = 0;
    setTimeout(() => {
      splashScreen.splashscreen.style.pointerEvents = "none";
      splashScreen.splashscreen.style.opacity = 0;
      document.querySelector(elmnt).style.pointerEvents = "auto";
    }, 500);
  }), 1000);
}