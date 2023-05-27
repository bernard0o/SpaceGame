const plane = document.getElementById("plane");
const gameBoard = document.getElementById("game-board");
let position = 50;
let moveRight = 0;
let moveLeft = 0;
let lasersPosition = [];
let enemiesPosition = [];

function checkCollision(elm1, elm2) {
    var elm1Rect = elm1.getBoundingClientRect();
    var elm2Rect = elm2.getBoundingClientRect();
  
    return (elm1Rect.right >= elm2Rect.left &&
        elm1Rect.left <= elm2Rect.right) &&
      (elm1Rect.bottom >= elm2Rect.top &&
        elm1Rect.top <= elm2Rect.bottom);
  }

function gameOver(){
    gameBoard.style.display = "none";
    document.getElementById("gameOver").style.display = "block";
}

// Main character moviment
document.addEventListener("keypress", function(keyboard){
    if (keyboard.key == "d" || keyboard.key == "ArrowRight"){
        clearInterval(moveLeft);
        clearInterval(moveRight);
            moveRight = setInterval(function(){
                if (position < 94){
                    position += 3;
                    plane.style.left = `${position}%`;
                }
            }, 100);
    } else if(keyboard.key == "a" || keyboard.key == "ArrowLeft"){
        clearInterval(moveRight);
        clearInterval(moveLeft);
            moveLeft = setInterval(function(){
                if (position > 6){
                    position -= 3;
                    plane.style.left = `${position}%`;
                }
            }, 100);
        plane.style.left = `${position}%`;
    }
})

// Enemies
setInterval(function(){
    //Creating enemy div
    let random = Math.floor(Math.random() * 90);
    let top = -5;
    let div = document.createElement("div");
    div.className = "enemy";
    gameBoard.appendChild(div);
    div.style.left = `${random}%`;
    //Loop to go down
    setInterval(function(){
        top += 10;
        // If enemy arrives bottom
        if (top >= 500){
            div.remove();
            gameOver();
        }
        div.style.top = `${top}px`
    }, 150)
}, 2000);


// Lasers
setInterval(function(){
    //Creating laser div
    let bottom = 70;
    let div = document.createElement("div");
    div.className = "laser";
    gameBoard.appendChild(div);
    div.style.left = `${position}%`;

    //Loop to go up
    let laserMoviment = setInterval(function(){
        bottom += 10;
        //When laser arrives top
        if (bottom >= 580){
            div.remove();
            clearInterval(laserMoviment);
            laserMoviment = 0;
        }
        div.style.bottom = `${bottom}px`
    }, 50)
}, 500);

//Detect if laser touches any enemy
let detect = setInterval(function(){
    const lasers = document.getElementsByClassName("laser");
    const enemies = document.getElementsByClassName("enemy");
    for (const laser of lasers) {
        for (const enemy of enemies) {
            if (checkCollision(laser, enemy)){
                enemy.style.backgroundImage = "url(explosion.gif)";
                enemy.style.width = "60px";
                setTimeout(function(){
                    enemy.remove();
                    laser.remove();
                }, 300)
                
            }
        }
    }

}, 50);
