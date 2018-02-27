
var cells = [];
var w = 800;
var h = 800;
var cellWid, cellHeight;
var num = 30;
var start = 100;
// array of ids:
var visitedCells = [];
var cellTwo;
var numCells = 0;

var path = [];

// Nuts, it passes arrays by reference......:
var test = [1, 2];
var test2 = test;
test2.pop();
console.log(test2, test);

// Problem: you'd think you could just save the previous cell as the one to backtrack to, because it must have had open neighbors. Issue is that its last neighbor might have been the deadend. How do we get back to the previous cell with live neighbors?
// Can we say that the prev cell has 2 possibilities? Because if only has one, it's heading for the dead end.

// Maybe we pass the global grid array to the carvePassage function??


function carvePassage(cell) {
  cell2 = {};
  // console.log(cell);
  var neighbors = getNeighbors(cell);
  // console.log(neighbors);
  var realNeighbors = [];
  // check whether the neighbors have been visited:
  neighbors.forEach(function(n) {
    if (!visitedCells.includes(n)) {
      realNeighbors.push(n);
    }
  });

  // Need to backtrack if no unvisited neighbors:
  if (realNeighbors.length == 0) {
    console.log('uh oh!');
    console.log(path);
    console.log(cell2);

    if (visitedCells.length < 100) {
      carvePassage(cell2);

    } else {
      return;
    }

    // while (path.length > 0) {
    //   var prev = path.pop();
    //   var neigh = getNeighbors(prev);
    //   var neighReal = [];
    //   neigh.forEach(function(x) {
    //     if (!visitedCells.includes(x)) {
    //       neighReal.push(x);
    //     }
    //   });
    //   console.log(neighReal);
    //   if (neighReal.length !== 0) {
    //     carvePassage(neighReal);
    //     // return;
    //   }
    // }

  // There is an available (i.e. unvisited) adjacent cell:
  } else {

    // Get next cell:
    var rand = Math.floor(Math.random() * realNeighbors.length);
    var next = realNeighbors[rand];
    visitedCells.push(next);
    var nextReal = cells.filter(function(c) {
      return c.id == next;
    });
    console.log(nextReal);

    path.push(nextReal[0]);
    numCells ++;

    if (realNeighbors.length > 1) {
      cell2 = nextReal[0];
      // console.log(cell2);
    }

    // console.log(cell.id, nextReal[0].id);

    // Remove barrier:
    stroke(41, 100, 200);
    strokeWeight(3);

    if (nextReal[0].id == cell.id + 1) {
      line(cell.x, cell.y + cellHeight, cell.x + cellWid, cell.y + cellHeight);
    } else if (nextReal[0].id == cell.id - 1) {
      line(cell.x, cell.y, cell.x + cellWid, cell.y);
    } else if (nextReal[0].id == cell.id + num) {
      line(cell.x + cellWid, cell.y, cell.x + cellWid, cell.y + cellHeight);
    } else if (nextReal[0].id == cell.id - num) {
      line(cell.x, cell.y, cell.x, cell.y + cellHeight);
    }


    carvePassage(nextReal[0]);
  } // end ELSE statement


}

function setup() {
  createCanvas(w, h);
  drawGrid();
  console.log(cells);
  // **** ahhh, returns an array ****:
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
