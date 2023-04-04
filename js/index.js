// Vanilla Javascript --> just plain js, with no additional libraries

let snakeDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3"); //ctrl+shift+L
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 7;
let score = 0;
let hiscoreval = 0;
let lastPaintTime = 0;
let snakeArr = [{ x: 10, y: 15 }];
let food = { x: 6, y: 7 };

function myMain(ctime) {
  window.requestAnimationFrame(myMain);
  //console.log(ctime)
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;
  gameEngine();
}

function isCollide(sarr) {
  //self collsion
  for (let i = 1; i < sarr.length; i++) {
    if (sarr[0].x === sarr[i].x && sarr[0].y === sarr[i].y) return true;
  }

  //wall collision
  if (
    snakeArr[0].y === 0 ||
    snakeArr[0].y === 18 ||
    snakeArr[0].x === 0 ||
    snakeArr[0].x === 18
  )
    return true;
  else return false;
}

function gameEngine() {
 
  //Part 2: Display snake & food element
  if (isCollide(snakeArr)) {
    gameOverSound.play();
    musicSound.pause();
    snakeDir = { x: 0, y: 0 };
    alert("Game over, Press any key to play again!");
    //if play again key is pressed...
    snakeArr = [{ x: 10, y: 15 }];
    musicSound.play();

    // high score hard coded functionality.....
    // score > hScore ? (hScore = score) : null;
    // highScore.innerHTML = "High Score: " + hScore;
    score = 0;
  }

  //if you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    foodSound.play();
    //Score
    score += 1;
    myscoreBox.innerHTML = "Score: " + score;

    //HighScore
    if(score>hiscoreval){
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      highscoreBox.innerHTML = "New High Score: " + hiscoreval;
    }

    //replace that food in front with a snake body part, i.e, head, before snake's body, thus, unshift
    snakeArr.unshift({
      x: snakeArr[0].x + snakeDir.x,
      y: snakeArr[0].y + snakeDir.y,
    });

    //generating new food
    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //moving the snake
  //lenghtening it................
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] }; //making array object coz call by reference

    //spread, call by reference eg.....
    // const arr = [1,2];

    // let i = arr.length-2;
    //     arr[i+1] = {...arr[i]};

    //  console.log(arr);
  }
  //moving it in keypress direction.........
  snakeArr[0].x += snakeDir.x;
  snakeArr[0].y += snakeDir.y;

  //Display snake element
  board.innerHTML = ""; //to access and write(read) HTML contents....
  //NOTE:
  // ...here, erasing previous contents, to access and write(read) HTML contents....
  // ...snake body segment added in array(using shift) is not getting erased...

  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("myDiv");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;
    if (index === 0) {
      snakeElement.classList.add("head"); //can only be used with id/const newElement
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement); //The appendChild() method appends a node (element) as the last child of an element
  });

  //Display food element
  foodElement = document.createElement("myDiv");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;
  foodElement.classList.add("food");
  board.appendChild(foodElement);
}

//Main Functions
//to clear, type: localstorage.clear()
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highscoreBox.innerHTML = "High Score: " + hiscore;
}

window.requestAnimationFrame(myMain); //The document object is a property of the window object.
musicSound.play();
window.addEventListener("keydown", (e) => {
  // addEventList(event, function)
  snakeDir = { x: 0, y: 1 }; // Start the game
  moveSound.play();
  switch (
    e.key //The key property returns the key that was pressed
  ) {
    case "ArrowUp":
      console.log("ArrowUp");
      snakeDir.x = 0;
      snakeDir.y = -1;
      break;

    case "ArrowDown":
      console.log("ArrowDown");
      snakeDir.x = 0;
      snakeDir.y = 1;
      break;

    case "ArrowLeft":
      console.log("ArrowLeft");
      snakeDir.x = -1;
      snakeDir.y = 0;
      break;

    case "ArrowRight":
      console.log("ArrowRight");
      snakeDir.x = 1;
      snakeDir.y = 0;
      break;
    default:
      break;
  }
  //console.log(snakeDir);
});
