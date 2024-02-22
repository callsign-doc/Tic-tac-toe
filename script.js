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

  // const markCell3 = ()


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






// DOM MANIPULATION
const documentMock = (() => ({
  querySelector: (selector) => ({
    innerHTML: null,
  }),

}))

const Formatter = (function(doc) {
  const log = (mesasage) => console.log(`[${Date.now()}] Logger: ${mesasage}`);
  let isDocumentValid = !!doc && "querySelector" in doc;

  const gameContainer = doc.querySelector('.gameContainer');

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  }

  const writeToDom = (selector, message) => {
    if (isDocumentValid) {
      doc.querySelector(selector).innerHTML = message;
    }
  }

  const displayGameboard = (board) => {
    if (isDocumentValid) {
        for (let row = 0; row < board.length; row++) {
            // Create a new div element for the row
            const rowElement = document.createElement('div');
            rowElement.classList.add('row'); // Add class 'row' to the row element

            // Set the row attribute on the row element
            rowElement.setAttribute('data-row', row);

            for (let column = 0; column < board[row].length; column++) {
                const cell = board[row][column];

                // Create a new div element for the grid item (cell)
                const gridItem = document.createElement('div');
                gridItem.classList.add('grid-item'); // Optional: Add class 'grid-item' for styling purposes

                // Assign the appropriate row and column attributes
                gridItem.setAttribute('data-row', row);
                gridItem.setAttribute('data-column', column);

                // Set the content of the grid item
                gridItem.textContent = `[${row}, ${column}]`;

                // Append the grid item to the row parent
                rowElement.appendChild(gridItem);
            }

            // Append the row element to the gameContainer
            gameContainer.appendChild(rowElement);
        }
    }
  } 



  return {
    makeUppercase, writeToDom, displayGameboard
  }
})(document || documentMock);






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

  const gameboardUI = document.querySelector('.gameContainer');

  let players = [player1, player2]
  let activePlayer = player1;

  let gameOver = false;
  let isTie = false; 

  const switchTurn = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
  };




  // GAME START
  Formatter.displayGameboard(Gameboard.board);

  
  gameboardUI.addEventListener('click', event => {
    if (!gameOver) {
      let target = event.target;

      // Access the data-row and data-column attributes
      let row = parseInt(target.getAttribute('data-row'));
      let column = parseInt(target.getAttribute('data-column'));
      let emptyCell = Gameboard.board[row][column] === ' ';

      if (emptyCell) {
        Gameboard.markCell(row, column, activePlayer.symbol);
        target.textContent = Gameboard.board[row][column];

        Gameboard.printBoard();
        gameOver = Gameboard.checkForWin();
        console.log(`gameOver: ${gameOver}`);
        switchTurn();

        // Put row and column information inside variables
        console.log('Row:', row);
        console.log('Column:', column);

      } else {
        console.log("This cell is occuppied!")
      }
    } 
    
    
    if (gameOver) {
      alert(`Game over, winner: ${Gameboard.getWinner()}`);
    }
  });

  

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



