const movement = {
  up: false,
  down: false,
  left: false,
  right: false,
};

function keydown(e) {
  if (e.key === "ArrowUp" || e.key === "w") {
    movement.up = true;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    movement.down = true;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    movement.left = true;
  } else if (e.key === "ArrowRight" || e.key === "d") {
    movement.right = true;
  }
}

function keyup(e) {
  if (e.key === "ArrowUp" || e.key === "w") {
    movement.up = false;
  } else if (e.key === "ArrowDown" || e.key === "s") {
    movement.down = false;
  } else if (e.key === "ArrowLeft" || e.key === "a") {
    movement.left = false;
  } else if (e.key === "ArrowRight" || e.key === "d") {
    movement.right = false;
  }
}

document.addEventListener("keydown", keydown, false);
document.addEventListener("keyup", keyup, false);