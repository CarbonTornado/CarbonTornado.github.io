const gap = 20;

function setup() {
  createCanvas(400, 400);

  background("#91A3B0");
  color(255);
  strokeWeight(10);

  for (let i = 1; i < 3; i++) {
    let spacing = i * width / 3;
    line(spacing, gap, spacing, width - gap);
    line(gap, spacing, width - gap, spacing);
  }

  for (let i = 1; i < 4; i++) {
    for (let j = 1; j < 4; j++) {
      if (i = 1) {
        positions.set(j - 1, new Bounds(i - 1, i * width / 3, j - 1, j * height / 3));
      }
      if (i = 2) {
        positions.set(j + 2, new Bounds(i - 1, i * width / 3, j - 1, j * height / 3));
      }
      if (i = 3) {
        positions.set(j + 5, new Bounds(i - 1, i * width / 3, j - 1, j * height / 3));
      }
    }
  }

  for (let i = 0; i < 9; i++) {
    pieces.set(i, char(i));
  }
}

let pieces = new Map();
let xTurn = true;
let positions = new Map();

function x(pos) {
  if (pieces.get(pos) != "X") {
    pieces.set(pos, "X");
    stroke("#B09492");
    line(positions.get(pos).ymax - height / 3 + gap, positions.get(pos).xmax - width / 3 + gap, positions.get(pos).ymax - gap, positions.get(pos).xmax - gap);
    line(positions.get(pos).ymax - gap, positions.get(pos).xmax - width / 3 + gap, positions.get(pos).ymax - height / 3 + gap, positions.get(pos).xmax - gap);
    xTurn = false;
  }
}

function o(pos) {
  if (pieces.get(pos) != "O") {
    fill("#91A3B0");
    stroke("#B0A892");
    pieces.set(pos, "O");
    circle(positions.get(pos).ymax - width / 6, positions.get(pos).xmax - width / 6, 100);
    xTurn = true;
  }
}

function mouseClicked() {
  if (xTurn) {
    x(calcPos(mouseX, mouseY));
  }
  else {
    o(calcPos(mouseX, mouseY));
  }
  if (three()) {
    fill(0);
    textSize(32);
    stroke(255);
    text("Game Over!", 133, 200);
  }
}

function three() {
  stroke(0);
  if (rows() || diag() || cols()) {
    return true;
  }
  return false;
}

function rows() {
  if (pieces.get(0) == pieces.get(1) && pieces.get(1) == pieces.get(2)) {
    line(positions.get(0).xmax - width / 6, positions.get(0).ymax - height / 6, positions.get(2).xmax - width / 6, positions.get(2).ymax - height / 6)
    return true;
  }
  if (pieces.get(3) == pieces.get(4) && pieces.get(4) == pieces.get(5)) {
    return true;
  }
  if (pieces.get(6) == pieces.get(7) && pieces.get(7) == pieces.get(8)) {
    return true;
  }
  return false;
}

function cols() {
  if (pieces.get(0) == pieces.get(3) && pieces.get(3) == pieces.get(6)) {
    return true;
  }
  if (pieces.get(1) == pieces.get(4) && pieces.get(4) == pieces.get(7)) {
    return true;
  }
  if (pieces.get(2) == pieces.get(5) && pieces.get(5) == pieces.get(8)) {
    return true;
  }
  return false;
}

function diag() {
  if (pieces.get(0) == pieces.get(4) && pieces.get(4) == pieces.get(8)) {
    return true;
  }
  if (pieces.get(2) == pieces.get(4) && pieces.get(4) == pieces.get(6)) {
    return true;
  }
  return false;
}

function calcPos(x, y) {
  if (x < width / 3 && y < height / 3) {
    return 0;
  }
  if (x < 2 * width / 3 && y < height / 3) {
    return 1;
  }
  if (x < width && y < height / 3) {
    return 2;
  }
  if (x < width / 3 && y < 2 * height / 3) {
    return 3;
  }
  if (x < 2 * width / 3 && y < 2 * height / 3) {
    return 4;
  }
  if (x < width && y < 2 * height / 3) {
    return 5;
  }
  if (x < width / 3 && y < height) {
    return 6;
  }
  if (x < 2 * width / 3 && y < height) {
    return 7;
  }
  if (x < width && y < height) {
    return 8;
  }
  return null;
}

class Bounds {
  constructor(xmin, xmax, ymin, ymax) {
    this.xmin = xmin;
    this.xmax = xmax;
    this.ymin = ymin;
    this.ymax = ymax;
  }
}