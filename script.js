//gameboard object to store the 3x3 gameboard
//cell object to be filled inside the gameboard
//gameController object to control the gameflow





// IMPORTANT: THE MAIN REASON FOR THE CREATION OF THIS BRANCH IS TO 
//SIMPLY THE CODE EVEN MORE, I CAN'T COMPREHEND THE IMPLEMENTATION OF 
//FACTORY FUNCTION AND MODULES YET

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

  return { board, printBoard, markCell };
}

let randomise = () => Math.floor(Math.random() * 3);



let game = Gameboard();
game.markCell(randomise(),randomise(),'X');
game.printBoard();