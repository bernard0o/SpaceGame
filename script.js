const plane = document.getElementById("plane");
const gameBoard = document.getElementById("game-board");
let position = 50;
let moveRight = 0;
let moveLeft = 0;
let lasersPosition = [];
let enemiesPosition = [];

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
            div.style.backgroundImage = "url(explosion.gif)";
            div.style.width = "50px"
            setTimeout(function(){
                div.remove();
            }, 500)
        }
        div.style.top = `${top}px`
    }, 200)
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
}, 800);

//Detect if laser touches any enemy
let detect = setInterval(function(){
    lasersPosition = [];
    const gameBoardChilds = gameBoard.children;
    for (let i = 0; i < gameBoardChilds.length; i++){
        if (gameBoardChilds[i].className == "laser"){
            lasersPosition.push([gameBoardChilds[i].getBoundingClientRect().bottom, gameBoardChilds[i].getBoundingClientRect().left]);
        }
        else if (gameBoardChilds[i].className == "enemy"){
            enemiesPosition.push([gameBoardChilds[i].getBoundingClientRect().bottom, gameBoardChilds[i].getBoundingClientRect().left]);
        }
    }
    for (let i2=0; i2 < lasersPosition.length; i2++){
        if (enemiesPosition.includes(lasersPosition[i2])){
            lasersPosition[i2].remove();
        }
    }
}, 50);
