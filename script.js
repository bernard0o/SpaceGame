const plane = document.getElementById("plane");
const gameBoard = document.getElementById("game-board");
let position = 50;

document.addEventListener("keypress", function(keyboard){
    if (keyboard.key == "d"){
        if (position < 95){
            position += 5;
        }
        plane.style.left = `${position}%`;
    } else if(keyboard.key == "a"){
        if (position > 5){
            position -= 5;
        }
        plane.style.left = `${position}%`;
    }
})

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