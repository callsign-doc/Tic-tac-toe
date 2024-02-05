//gameboard object to store the 3x3 gameboard
//cell object to be filled inside the gameboard
//gameController object to control the gameflow

function Gameboard() {
  const rows = 3;
  const columns = 3;
  const board = [];

  //create 3x3 board, each square will be filled by a Cell object
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j< columns; j++) {
      board[i].push('69');
    }
  }

  const printBoard = () => console.log(board);

  const markCell = (row, column, player) => {
    board[row][column] = player;
  }

  return { printBoard, markCell };
}

function Cell() {



}




let game = Gameboard();
game.markCell(1,1,'X');
game.printBoard();