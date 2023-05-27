const plane = document.getElementById("plane");
const gameBoard = document.getElementById("game-board");
let position = 50;
let moveRight = 0;
let moveLeft = 0;
let kills = 0;

function checkCollision(elm1, elm2) {
  const elm1Rect = elm1.getBoundingClientRect();
  const elm2Rect = elm2.getBoundingClientRect();

  return (
    elm1Rect.right >= elm2Rect.left &&
    elm1Rect.left <= elm2Rect.right &&
    elm1Rect.bottom >= elm2Rect.top &&
    elm1Rect.top <= elm2Rect.bottom
  );
}

function gameOver() {
  document.getElementById("kills").innerText = Math.ceil(kills / 7) + 1;
  gameBoard.style.display = "none";
  document.getElementById("gameOver").style.display = "flex";
  clearInterval(laserInterval);
  clearInterval(enemyInterval);
}

// Main character movement
document.addEventListener("keydown", function (keyboard) {
  if (keyboard.key === "d" || keyboard.key === "ArrowRight") {
    clearInterval(moveLeft);
    clearInterval(moveRight);
    moveRight = setInterval(function () {
      if (position < 94) {
        position += 3;
        plane.style.left = `${position}%`;
      }
    }, 100);
  } else if (keyboard.key === "a" || keyboard.key === "ArrowLeft") {
    clearInterval(moveRight);
    clearInterval(moveLeft);
    moveLeft = setInterval(function () {
      if (position > 6) {
        position -= 3;
        plane.style.left = `${position}%`;
      }
    }, 100);
  }
});

// Enemies
let enemyInterval = setInterval(function () {
  // Creating enemy div
  let random = Math.floor(Math.random() * 90);
  let top = 0;
  let div = document.createElement("div");
  div.className = "enemy";
  gameBoard.appendChild(div);
  div.style.left = `${random}%`;

  // Loop to go down
  let enemyMovement = setInterval(function () {
    top += 10;
    // If enemy reaches the bottom
    if (top >= 580) {
      div.remove();
      clearInterval(enemyMovement);
      gameOver();
    }
    div.style.top = `${top}px`;
  }, 60);

  let detect = setInterval(function () {
    const lasers = document.getElementsByClassName("laser");
    let c = 0;
    for (const laser of lasers) {
      if (checkCollision(laser, div)) {
        div.style.backgroundImage = "url(explosion.gif)";
        div.style.width = "60px";
        setTimeout(function () {
          div.remove();
          laser.remove();
          clearInterval(enemyMovement);
        }, 300);
        if (c == 0){
            kills +=1;
            c+=1;
          }
      }
    }
  }, 50);
}, 1200);

// Lasers
let laserInterval = setInterval(function () {
    // Creating laser div
    let bottom = 70;
    let div = document.createElement("div");
    div.className = "laser";
    gameBoard.appendChild(div);
    div.style.left = `${position}%`;
  
    // Loop to go up
    let laserMovement = setInterval(function () {
      bottom += 10;
      div.style.bottom = `${bottom}px`;
  
      // When laser reaches the top
      if (bottom <= 0) {
        div.remove();
        clearInterval(laserMovement);
      }
    }, 50);
  }, 500);
  