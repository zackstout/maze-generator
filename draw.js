
var cells = [];
var w = 800;
var h = 800;
var cellWid, cellHeight;
var num = 30;
var start = 0;
// array of ids:
var visitedCells = [];

function carvePassage(cell) {
  console.log(cell);
  var neighbors = getNeighbors(cell);
  // console.log(neighbors);
  var realNeighbors = [];
  // check whether the neighbors have been visited:
  neighbors.forEach(function(n) {
    if (!visitedCells.includes(n)) {
      realNeighbors.push(n);
    }
  });
  // need to backtrack:
  if (realNeighbors.length == 0) {

  } else {
    // Get next cell:
    var rand = Math.floor(Math.random() * realNeighbors.length);
    var next = realNeighbors[rand];
    visitedCells.push(next);
    var nextReal = cells.filter(function(c) {
      return c.id == next;
    });
    console.log(nextReal);

    console.log(cell.id, nextReal[0].id);
    // Remove barrier:
    if (nextReal[0].id == cell.id + 1) {
      stroke(41, 100, 200);
      strokeWeight(3);
      console.log('hi');
      line(cell.x, cell.y + cellHeight, cell.x + cellWid, cell.y + cellHeight);
    } else if (nextReal[0].id == cell.id - 1) {

    } else if (nextReal[0].id == cell.id + num) {
      stroke(41, 100, 200);
      strokeWeight(3);
      console.log('hey');
      line(cell.x + cellWid, cell.y, cell.x + cellWid, cell.y + cellHeight);
    } else if (nextReal[0].id == cell.id - num) {

    }
  }


}

function setup() {
  createCanvas(w, h);
  drawGrid();
  console.log(cells);
  // ahhh, returns an array:
  var startCell = cells.filter(function(c) {
    return c.id == start;
  });
  // console.log(startCell);
  visitedCells.push(start);
  carvePassage(startCell[0]);

}

function draw() {
  // background(210);
  // console.log(width);
}

function getNeighbors(cell) {
  var up, down, left, right;
  var output = [];
  // check if on top border:
  if (cell.id % num != 0) {
    up = cell.id - 1;
    output.push(up);
  }
  // check if on bottom border:
  if (cell.id % num != (num - 1)) {
    down = cell.id + 1;
    output.push(down);
  }
  // check if on left border:
  if (cell.id >= num) {
    left = cell.id - num;
    output.push(left);
  }
  // check if on right border:
  if (cell.id <= w - cellWid) {
    right = cell.id + num;
    output.push(right);
  }

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
        // visited: false,
        id: i * num + j,
      };
      cells.push(cell);
    }
  }
}
