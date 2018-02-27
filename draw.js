
var cells = [];
var w = 800;
var h = 800;
var cellWid, cellHeight;
var num = 30;

function setup() {
  createCanvas(w, h);
  drawGrid();
  console.log(cells);
  cells.forEach(function(cell, index) {
    if (index < 50) {
      console.log(getNeighbors(cell), cell.id);
    }
  });
}

function draw() {
  // background(210);
  // console.log(width);
}

function getNeighbors(cell) {
  var up, down, left, right;
  // check if on top border:
  if (cell.id % num != 0) {
    up = cell.id - 1;
  }
  // check if on bottom border:
  if (cell.id % num != (num - 1)) {
    down = cell.id + 1;
  }
  // check if on left border:
  if (cell.id >= num) {
    left = cell.id - num;
  }
  // check if on right border:
  if (cell.id <= w - cellWid) {
    right = cell.id + num;
  }
  var output = [up, right, down, left];
  return output;
}

function drawGrid() {
  cellWid = w / num;
  cellHeight = h / num;
  for (var i=0; i < num; i++) {
    for (var j=0; j < num; j++) {
      fill(41, 100, 200);
      rect(i * cellWid, j * cellHeight, cellWid, cellHeight);
      var cell = {
        x: i * cellWid,
        y: j * cellHeight,
        visited: false,
        id: i * num + j,
      };
      cells.push(cell);
    }
  }
}
