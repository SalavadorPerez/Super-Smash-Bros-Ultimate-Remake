document.addEventListener("DOMContentLoaded", init);
function init() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js");
  }
}