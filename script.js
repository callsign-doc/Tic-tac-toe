// CURRENT OBJECTIVE: 

const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  const board = [];
  let winner;

  //create 3x3 board, each square will be filled by a Cell object
  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j< columns; j++) {
      board[i].push(' ');
    }
  }

  const printBoard = () => console.log(board);

  const getWinner = () => winner;

  const markCell = (row, column, player) => {

    board[row][column] = player;
  }

  let randomise = () => Math.floor(Math.random() * 3);
  let markRandomCell2 = (activePlayer) => markCell(randomise(),randomise(),activePlayer.symbol);


  function markRandomCell(activePlayer) {
    let randomRow;
    let randomColumn;
    let cellOccupied;

    //keep randomising till an empty 
    do {
      randomRow = randomise();
      randomColumn = randomise();
      cellOccupied = board[randomRow][randomColumn] !== ' ';
    } while (cellOccupied);

    markCell(randomRow, randomColumn, activePlayer.symbol);
    activePlayer.moves ++;
    console.log(`active player ${activePlayer.symbol} moves: ${activePlayer.moves} @ ${randomRow}, ${randomColumn}`);
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

  function checkForWin() {
    let checkHorizontalWin = () => {
      for (let row = 0; row <= 2; row++) {
        if (board[row][0] === board[row][1] && board[row][0] === board[row][2]) {
          console.log("Win by Horizontal");
          winner = board[row][0];
          return true;
        }  
      }
    }
  
    let checkVerticalWin = () => {
      for (let column = 0; column <= 2; column++) {
        if (board[0][column] === board[1][column] && board[0][column] === board[2][column]) {
          console.log("Win by Vertical");
          winner = board[0][column];
          return true;
        }  
      }
    }
  
    let checkDiagonalWin = () => {
      const case1 = board[0][0] === board[1][1] && board[1][1] === board [2][2];
      const case2 = board[0][2] === board[1][1] && board[1][1] === board [2][0];
  
      if (case1 || case2) {
        console.log("Win by Diagonal")
        winner = board[0][0];
        return true;
      };
    }

    return checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
  }
  
  

  return { board, winner,getWinner,
    printBoard,
    markCell,
    markRandomCell,
    checkForWin,
    markHorizontalWin, markVerticalWin, markDiagonalWin
   };
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


  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();
  Gameboard.markRandomCell(activePlayer);
  switchTurn();

  Gameboard.checkForWin();
  console.log(`Wiener: Wielder of ${Gameboard.getWinner()}`);
  console.log(`Winner: User ${Gameboard.winner}`);

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



