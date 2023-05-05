const plane = document.getElementById("plane");
const gameBoard = document.getElementById("game-board");
let position = 50;

// Moviment
document.addEventListener("keypress", function(keyboard){
    if (keyboard.key == "d"){
        if (position < 95){
            position += 1;
        }
        plane.style.left = `${position}%`;
    } else if(keyboard.key == "a"){
        if (position > 5){
            position -= 1;
        }
        plane.style.left = `${position}%`;
    }
})

// Enemies

setInterval(function(){
    let random = Math.floor(Math.random() * 98);
    let top = 0;
    let div = document.createElement("div");
    div.className = "enemy";
    gameBoard.appendChild(div);
    div.style.left = `${random}%`;
    setInterval(function(){
        top += 10;
        if (top >= 500){ // Game over
            
        }
        div.style.top = `${top}px`
    }, 200)
}, 2000);


// Lasers
setInterval(function(){
    let bottom = 70;
    let div = document.createElement("div");
    div.className = "laser";
    gameBoard.appendChild(div);
    div.style.left = `${position}%`;
    setInterval(function(){
        bottom += 10;
        if (bottom >= 580){
            div.remove();
        }
        div.style.bottom = `${bottom}px`
    }, 50)
}, 400);

