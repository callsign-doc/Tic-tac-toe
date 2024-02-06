//gameboard object to store the 3x3 gameboard
//cell object to be filled inside the gameboard
//gameController object to control the gameflow



// IMPORTANT: THE MAIN REASON FOR THE CREATION OF THIS BRANCH IS TO 
//SIMPLY THE CODE EVEN MORE, I CAN'T COMPREHEND THE IMPLEMENTATION OF 
//FACTORY FUNCTION AND MODULES YET

const Gameboard = (() => {
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

  let randomise = () => Math.floor(Math.random() * 3);
  let markRandomCell2 = (activePlayer) => markCell(randomise(),randomise(),activePlayer.symbol);

  function markRandomCell(activePlayer) {
    let randomRow = randomise()
    let randomColumn = randomise()

    //keep randomising till an empty 
    while (board[randomRow][randomColumn] !== ' ') {
      randomRow = randomise();
      randomColumn = randomise();
    }

    markCell(randomRow, randomColumn, activePlayer.symbol);
    activePlayer.moves ++;
    console.log(`active player moves: ${activePlayer.moves}`);
  }


  return { board, printBoard, markCell, markRandomCell };
})();

function GameController() {
  //initialise Gameboard object

  let player1 = {
    name: 'Player One',
    symbol: 'X',
    moves: 0
  }
  let player2 = {
    name: 'Player Two',
    symbol: 'O',
    moves: 0
  }

  let players = [player1, player2]
  let activePlayer = player1;

  const switchTurn = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
  };

  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);
  Gameboard.markRandomCell(activePlayer);

  Gameboard.printBoard();
}

let game = GameController();








// //game start with player one
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();



