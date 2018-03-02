
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
var deadEnd = false;

var nextCell, currentCell;

// Nuts, it passes arrays by reference......:
// var test = [1, 2];
// var test2 = test;
// test2.pop();
// console.log(test2, test);

// Problem: you'd think you could just save the previous cell as the one to backtrack to, because it must have had open neighbors. Issue is that its last neighbor might have been the deadend. How do we get back to the previous cell with live neighbors?
// Can we say that the prev cell has 2 possibilities? Because if only has one, it's heading for the dead end.

// Maybe we pass the global grid array to the carvePassage function??


function carvePassage(cell) {
  // console.log(numCells);
  if (numCells > 500) {
    console.log(('all done!'));
    return;
  } else {
    var neighbors = getNeighbors(cell);
    var realNeighbors = [];

    if (!deadEnd) {
      // Check whether the neighbors have been visited:
      neighbors.forEach(function(n) {
        if (!visitedCells.includes(n)) {
          realNeighbors.push(n);
        }
      });

      // Need to backtrack if no unvisited neighbors:
      if (realNeighbors.length == 0) {
        console.log('uh oh!');
        console.log(path);
        deadEnd = true;
        // console.log(deadEnd);
        carvePassage(currentCell);

      // There is an available (i.e. unvisited) adjacent cell:
      } else {

        // Get next cell:
        var rand = Math.floor(Math.random() * realNeighbors.length);
        var next = realNeighbors[rand];
        visitedCells.push(next);
        var nextReal = cells.filter(function(c) {
          return c.id == next;
        });

        var currentReal = cells.filter(function(c) {
          return c.id == cell.id;
        });
        // last one of these logged is the one *before* the dead end:
        console.log(currentReal[0]);
        currentCell = currentReal[0];

        // last element of failed path is the dead end cell itself:
        path.push(nextReal[0]);
        numCells ++;

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
        nextCell = nextReal[0];
        carvePassage(nextReal[0]);
      } // end ELSE statement

    // we hit a dead end:
    } else {
      console.log('dead end ');
      // get rid of dead end:
      path.pop();
      while (deadEnd) {
        var last = path.pop();
        // check last's neighbors:
        var neigh = getNeighbors(last);
        var realNeigh = [];
        neigh.forEach(function(neighb) {
          if (!visitedCells.includes(neighb)) {
            realNeigh.push(neighb);
          }
        });
        if (realNeigh.length == 0) {
          // We are still dead, need to keep backtracking:
        } else {
          deadEnd = false;
          carvePassage(last);
        }
      }
      // carvePassage(currentCell);

    }
    // Recurse:


  }

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
