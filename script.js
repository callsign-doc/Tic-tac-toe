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

  const markCell2 = (player) => {
    let rowChosen = parseInt(prompt(`Player ${player.symbol}: Select row 0-2`))
    let columnChosen = parseInt(prompt("Enter column 0-2"))

    while (isNaN(rowChosen) || rowChosen < 0 || rowChosen >= board.length) {
      rowChosen = parseInt(prompt("Invalid input! Please enter a valid row number:"));
    }
    while (isNaN(columnChosen) || columnChosen < 0 || columnChosen >= board.length) {
      rowChosen = parseInt(prompt("Invalid input! Please enter a valid row number:"));
    }

    board[rowChosen][columnChosen] = player.symbol;
    alert(board);
  }


  let randomise = () => Math.floor(Math.random() * 3);


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
        if (board[row][0] === board[row][1] && board[row][0] === board[row][2] && board[row][0] !== ' ') {
          console.log("Win by Horizontal");
          winner = board[row][0];
          return true;
        }  
      }
    }
  
    let checkVerticalWin = () => {
      for (let column = 0; column <= 2; column++) {
        if (board[0][column] === board[1][column] && board[0][column] === board[2][column] && board[0][column] !== ' ') {
          console.log("Win by Vertical");
          winner = board[0][column];
          return true;
        }  
      }
    }
  
    let checkDiagonalWin = () => {
      const case1 = board[0][0] === board[1][1] && board[1][1] === board [2][2] && board[1][1] !== ' ';
      const case2 = board[0][2] === board[1][1] && board[1][1] === board [2][0] && board[1][1] !== ' ';
  
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
    markCell, markCell2,
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

  let isTie = false; 

  const switchTurn = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
  };


  //PROBLEM HERE, GAME DOESN'T END AT 9 filled cells, instead it continues until there is a winner
  // while (!Gameboard.checkForWin() && player1.moves < 5) {
  //   Gameboard.markCell2(activePlayer);
  //   Gameboard.printBoard();
  //   switchTurn();
  // }

  // Gameboard.checkForWin();
  console.log(`Wiener: Wielder of ${Gameboard.getWinner()}`);
  console.log(`Winner: User ${Gameboard.winner}`);

  Gameboard.printBoard();
}




// DOM MANIPULATION
const documentMock = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),

}))

const Formatter = (function(doc) {
  const log = (mesasage) => console.log(`[${Date.now()}] Logger: ${mesasage}`);
  let isDocumenValid = !!doc && "querySelector" in doc;

  const gameContainer = doc.querySelector('.gameContainer');

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  }

  const writeToDom = (selector, message) => {
    if (isDocumenValid) {
      doc.querySelector(selector).innerHTML = message;
    }
  }

  const displayGameboard = (board) => {
    if (isDocumenValid) {
      // Loop over each row in the board
      for (let row = 0; row < board.length; row++) {
        // Loop over each column in the current row
        for (let column = 0; column < board[row].length; column++) {
            // Access the current cell using board[row][column]
            const cell = board[row][column];
            // Do something with the cell (e.g., access properties or perform operations)
            console.log(`Cell at position (${row}, ${column}): ${cell}`);
        }
      }
    }
  }

  return {
    makeUppercase, writeToDom, displayGameboard
  }
})(document || documentMock);

// Formatter.writeToDom('#target', 'Message Alpha');
Formatter.displayGameboard(Gameboard.board);


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



