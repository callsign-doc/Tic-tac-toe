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
    console.log(`active player ${activePlayer.symbol} moves: ${activePlayer.moves}`);
  }

  function markHorizontalWin(activePlayer) {
    markCell(2, 0, activePlayer.symbol);
    markCell(2, 1, activePlayer.symbol);
    markCell(2, 2, activePlayer.symbol);

    activePlayer.moves ++;
    activePlayer.moves ++;
    activePlayer.moves ++;

    console.log(`active player ${activePlayer.symbol} moves: ${activePlayer.moves}`);
  }

  function markVerticalWin(activePlayer) {
    markCell(0, 1, activePlayer.symbol);
    markCell(1, 1, activePlayer.symbol);
    markCell(2, 1, activePlayer.symbol);

    activePlayer.moves ++;
    activePlayer.moves ++;
    activePlayer.moves ++;

    console.log(`active player ${activePlayer.symbol} moves: ${activePlayer.moves}`);
  }

  function markDiagonalWin(activePlayer) {
    markCell(0, 2, activePlayer.symbol);
    markCell(1, 1, activePlayer.symbol);
    markCell(2, 0, activePlayer.symbol);

    activePlayer.moves ++;
    activePlayer.moves ++;
    activePlayer.moves ++;

    console.log(`active player ${activePlayer.symbol} moves: ${activePlayer.moves}`);
  }

  let checkHorizontalWin = () => {
    for (let row = 0; row <= 2; row++) {
      if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
        return true;
      }  
    }
  }

  let checkVerticalWin = () => {
    for (let column = 0; column <= 2; row++) {
      if (board[0][column] === board[1][column] && board[0][column] === board[2][column]) {
        return true;
      }  
    }
  }

  let checkDiagonalWin = () => {
    const case1 = board[0][0] === board[1][1] && board[1][1] === board [2][2];
    const case2 = board[0][2] === board[1][1] && board[1][1] === board [2][0];

    return case1 || case2;
  }

    let verticalWin = false;
    let diagonalWin = false;


  


  return { board, 
    printBoard,
    markCell,
    markRandomCell,
    markHorizontalWin, markVerticalWin, markDiagonalWin,
    checkHorizontalWin, checkVerticalWin, checkDiagonalWin };
})();



function GameController() {

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

  Gameboard.markDiagonalWin(activePlayer);
  if (Gameboard.checkDiagonalWin()) {
    console.log("Player whatever WON by way of DiagonaLES")
  }

  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  // Gameboard.markRandomCell(activePlayer);
  // switchTurn();
  

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



