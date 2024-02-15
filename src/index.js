import "./style.css";

function knightMoves(start, end) {
  const moves = [
      [-2, -1], [-2, 1], [2, -1], [2, 1],
      [-1, -2], [-1, 2], [1, -2], [1, 2]
  ];

  const withinBoard = (square) => {
      const [x, y] = square;
      return x >= 0 && x < 8 && y >= 0 && y < 8;
  };

  const visited = new Set();
  const queue = [];
  queue.push(start);

  while (queue.length > 0) {
      const current = queue.shift();
      if (current[0] === end[0] && current[1] === end[1]) {
          return getPath(start, current);
      }
      visited.add(current.toString());
      for (const move of moves) {
          const nextX = current[0] + move[0];
          const nextY = current[1] + move[1];
          const nextSquare = [nextX, nextY];
          if (withinBoard(nextSquare) && !visited.has(nextSquare.toString())) {
              nextSquare.previous = current; // Store predecessor
              queue.push(nextSquare);
          }
      }
  }
}

function getPath(start, end) {
  const path = [];
  let current = end;
  while (current.toString() !== start.toString()) {
      path.unshift(current);
      current = current.previous;
  }
  path.unshift(start);
  return path;
}

// Test cases
console.log(knightMoves([0,0],[1,2]));
console.log(knightMoves([0,0],[3,3]));
console.log(knightMoves([3,3],[0,0]));
console.log(knightMoves([0,0],[7,7]));