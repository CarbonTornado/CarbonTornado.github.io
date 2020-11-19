function setup() {
  createCanvas(400, 400);
  background(200);
  for (let i = 0; i < width/20; i++) {
    for(let j=0;j<width/20;j++){
      snElemens[i] = []
    }
  }
  snElemens[9][9] = "X";
}
let snElemens = [];
let direction = "right";
function draw(){
  if(direction=="left"){
    snElemens.forEach(function(elem, x) {
      if (x < 0) {
      }
  });
  }
  else if(direction == "right"){
    snElemens.forEach(function(elem, x) {
      if (x < snElemens.length) {
      }
  });
  }
  else if(direction == "up"){
    snElemens.forEach(function(elem, x) {
      if (y < 0) {
      }
  });
  }
  else if(direction == "down"){
    snElemens.forEach(function(elem, x) {
      if (y < snElemens.length) {
      }
  });
  }
}

function createfruitpos(){
  return new Point(Math.floor(Math.random() * Math.floor(width/20)),Math.floor(Math.random() * Math.floor(height/20)))
}

function fruit(x,y){
  if(x==fruit.x && y == fruit.y){
    return true;
  }
  return false;
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    direction = "left";
  } else if (keyCode === RIGHT_ARROW) {
    direction = "right";
  }
  else if (keyCode === UP_ARROW) {
    direction = "up";
  }
  else if (keyCode === DOWN_ARROW) {
    direction = "down";
  }
  console.log(direction);
}

//Array [i][j]
//Right +j
//Left  -j
//Up    +i
//Down -i