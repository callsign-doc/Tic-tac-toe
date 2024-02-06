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
      board[i].push(' ');
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
let markRandomCell = () => game.markCell(randomise(),randomise(),activePlayer.symbol);

let player1 = {
  name: 'Player One',
  symbol: 'X'
}
let player2 = {
  name: 'Player Two',
  symbol: 'O'
}
let players = [player1, player2]
let activePlayer = player1;

let switchTurn = () => {
  activePlayer = (activePlayer === player1) ? player2 : player1;
};

//game start with player one
markRandomCell();
switchTurn();
markRandomCell();
switchTurn();
markRandomCell();
switchTurn();
markRandomCell();
switchTurn();



game.printBoard();