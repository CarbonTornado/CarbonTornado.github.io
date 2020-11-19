const gap = 20;
let pieces = [];
let prevTurn = "O";
let game = true;
let positions = [];

function setup() {
  createCanvas(400, 400);

  background("#91A3B0");
  color(255);
  strokeWeight(10);

  //Create playingfield
  for (let i = 1; i < 3; i++) {
    let spacing = i * width / 3;
    line(spacing, gap, spacing, width - gap);
    line(gap, spacing, width - gap, spacing);
  }

  //Calculate boundaries
  //i = col; j = row
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      positions.push(new Bounds(j * width / 3, i * height / 3));
    }
  }

  //Fill pieces to avoid early game over
  for (let i = 0; i < 9; i++) {
    pieces[i] = char(i);
  }
}

//onMouseClick
function mouseClicked() {
  if (game) {
    if (prevTurn == "O") {
      drawX(calcPosfromMouse(mouseX, mouseY));
    }
    else {
      drawO(calcPosfromMouse(mouseX, mouseY));
    }
    if (three()) {
      gameOver();
      game = false;
    }
  }
  else{
  reset();
  }
}

//Draw X
function drawX(pos) {
  if (!occupied(pos)) {
    prevTurn = "X";
    pieces[pos] = "X";
    stroke("#B09492");
    line(positions[pos].x - width / 3 + gap, positions[pos].y - height / 3 + gap, positions[pos].x - gap, positions[pos].y - gap);
    line(positions[pos].x - gap, positions[pos].y - height/ 3 + gap, positions[pos].x - width / 3 + gap, positions[pos].y - gap);
  }
}

//Draw O
function drawO(pos) {
  if (!occupied(pos)) {
    prevTurn = "O";
    fill("#91A3B0");
    stroke("#B0A892");
    pieces[pos] = "O";
    circle(positions[pos].x - width/ 6, positions[pos].y - height / 6, 100);
  }
}

//Calculate if there are three in a row
function three() {
  if (rows() || diag() || cols()) {
    return true;
  }
  return false;
}

//Check for rows
//Refactor
function rows() {
  if (pieces[0] == pieces[1] && pieces[1] == pieces[2]) {
    return true;
  }
  if (pieces[3] == pieces[4] && pieces[4] == pieces[5]) {
    return true;
  }
  if (pieces[6] == pieces[7] && pieces[7] == pieces[8]) {
    return true;
  }
  return false;
}

//Check for colums and draw lines
//Refactor
function cols() {
  if (pieces[0] == pieces[3] && pieces[3] == pieces[6]) {
    return true;
  }
  if (pieces[1] == pieces[4] && pieces[4] == pieces[7]) {
    return true;
  }
  if (pieces[2] == pieces[5] && pieces[5] == pieces[8]) {
    return true;
  }
  return false;
}

//Check for diags
//Refactor
function diag() {
  if (pieces[0] == pieces[4] && pieces[4] == pieces[8]) {
    return true;
  }
  if (pieces[2] == pieces[4] && pieces[4] == pieces[6]) {
    return true;
  }
  return false;
}

function reset() {
  game = true;
  background("#91A3B0");
  stroke(0);
  for (let i = 1; i < 3; i++) {
    let spacing = i * width / 3;
    line(spacing, gap, spacing, width - gap);
    line(gap, spacing, width - gap, spacing);
  }
    //Fill pieces to avoid early game over
    for (let i = 0; i < 9; i++) {
      pieces[i] = char(i);
    }
  game = true;
}

function calcPosfromMouse(x, y) {
  console.log("X: " + x + " Y: " + y);
  for (let pos = 0; pos < 9; pos++) {
    if (positions[pos].x > x && positions[pos].y > y) {
      return pos;
    }
  }

}

function occupied(pos) {
  return pieces[pos] == "X" || pieces[pos] == "O";
}

function gameOver() {
  fill(0);
  textSize(32);
  stroke(255);
  textAlign("center");
  text("Game Over!\n" + prevTurn + " Wins!", 200, 200);
}

class Bounds {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}