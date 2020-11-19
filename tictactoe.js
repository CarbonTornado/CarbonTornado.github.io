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

  //Calculate boundaries
  //i = col; j = row
  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      positions.push(new Bounds(j * width / 3, i * height / 3));
    }
  }

  initPlayfield();
  initPieces();
}

//onMouseClick
function mouseClicked() {
  let pos = calcPosfromMouse(mouseX, mouseY);
  if (game && !occupied(pos)) {
    if (prevTurn == "O") {
      drawX(pos);
      prevTurn = "X";
      pieces[pos] = "X";
    }
    else {
      drawO(pos);
      prevTurn = "O";
      pieces[pos] = "O";
    }
    if (three()) {
      game = false;
      drawString("Game Over!\n" + prevTurn + " Wins!");
    }
    else if(isDraw()){
      game = false;
      drawString("Its a draw!");
    }
  }
  else {
    reset();
  }
}

//Draw X
function drawX(pos) {
  stroke("#B09492");
  line(positions[pos].x - width / 3 + gap, positions[pos].y - height / 3 + gap, positions[pos].x - gap, positions[pos].y - gap);
  line(positions[pos].x - gap, positions[pos].y - height / 3 + gap, positions[pos].x - width / 3 + gap, positions[pos].y - gap);
}

//Draw O
function drawO(pos) {
  fill("#91A3B0");
  stroke("#B0A892");
  circle(positions[pos].x - width / 6, positions[pos].y - height / 6, 100);
}

//Calculate if there are three in a row
function three() {
  if (rows() || diag() || cols()) {
    return true;
  }
  return false;
}

//Check for rows
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
  initPlayfield();
  initPieces();
  game = true;
}

//Calculate field from mouse click position
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

//Draw the game over text on the screen
function drawString(msg) {
  fill(0);
  textSize(32);
  stroke(255);
  textAlign("center");
  text(msg, width / 2, width / 2);
}

//Check if state is a draw
function isDraw() {
  return pieces.every(elem => ["X", "O"].includes(elem))
}

function initPlayfield() {
  //Create playingfield
  for (let i = 1; i < 3; i++) {
    let spacing = i * width / 3;
    line(spacing, gap, spacing, width - gap);
    line(gap, spacing, width - gap, spacing);
  }
}

function initPieces() {
  //Fill pieces to avoid early game over
  for (let i = 0; i < 9; i++) {
    pieces[i] = char(i);
  }
}

class Bounds {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}