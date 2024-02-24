// CURRENT OBJECTIVE: 
const Gameboard = (() => {
  const rows = 3;
  const columns = 3;
  let lastPlayer = 'X';
  let board = [];
  let winner;

  const isCellEmpty = (row, column) => {
    let cellContent = board[row][column];
    return cellContent === ' ';
  }

  //create 3x3 board, each square will be filled by a Cell object
  const createBoard = () => {
    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j< columns; j++) {
        board[i].push(' ');
      }
    }
  }

  const getBoard = () => board;

  const resetBoard = () => {
    board = [];
    createBoard();
  }

  const printBoard = () => console.log(board);

  const getWinner = () => winner;

  const getLastPlayer = () => lastPlayer;
  const changeLastPlayer = (activePlayer) => {
    lastPlayer = activePlayer.symbol;
  }

  const markCell = (row, column, player) => {
    board[row][column] = player;
    lastPlayer = player;
    console.log(`Last player = ${lastPlayer}`);
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

  createBoard();

  return { board, getBoard, winner, getWinner, 
    getLastPlayer, changeLastPlayer,
    printBoard, resetBoard, 
    markCell, markCell2, isCellEmpty,
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

const DisplayController = (function(doc) {
  const log = (mesasage) => console.log(`[${Date.now()}] Logger: ${mesasage}`);
  let isDocumentValid = !!doc && "querySelector" in doc;

  const gameContainer = doc.querySelector('.gameContainer');

  const updateGridItemClass = (event) => {
    let symbol = Gameboard.getLastPlayer();
    let target = event.target;
    
    if (target.classList.contains('grid-item')) {
      console.log(`yobro, the symbol is ${symbol}`);
      
      if (symbol === 'X') {
          target.classList.add('grid-item-x');
      } else if (symbol === 'O') {
          target.classList.add('grid-item-o');
      }

      if (target.getAttribute('marked') !== 'true') {
        target.textContent = symbol;
      }
      
    }
  }

  gameContainer.addEventListener('mouseover', (event) => {
    updateGridItemClass(event);
  });


  gameContainer.addEventListener('mouseout', (event) => {
      let target = event.target;
      if (target.classList.contains('grid-item')) {
        target.style.backgroundColor = ''; // Revert to original color (empty string)
        target.classList.remove('grid-item-x', 'grid-item-o');

        if (target.getAttribute('marked') !== 'true') {
          target.textContent = ' ';
        } 
        
      }
  });

  

  const makeUppercase = (text) => {
    log("Making uppercase");
    return text.toUpperCase();
  }

  const writeToDom = (selector, message) => {
    if (isDocumentValid) {
      doc.querySelector(selector).innerHTML = message;
    }
  }

  const clearGameboard = () => {
    while (gameContainer.firstChild) {
        gameContainer.removeChild(gameContainer.firstChild);
    }
  };


  const markGameboardUI = (target, row, column) => {
    let board = Gameboard.getBoard();
    target.textContent = board[row][column];
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
                // gridItem.textContent = `[${row}, ${column}]`;
                gridItem.textContent = ' '

                // Append the grid item to the row parent
                rowElement.appendChild(gridItem);
            }

            // Append the row element to the gameContainer
            gameContainer.appendChild(rowElement);
        }
    }
  } 



  return {
    makeUppercase, writeToDom, 
    displayGameboard, clearGameboard, markGameboardUI,
    updateGridItemClass
  }
})(document || documentMock);






const GameController = (function() {
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
  const resetBtn = document.getElementById('resetBtn');

  let players = [player1, player2]
  let activePlayer = player1;
  const getActivePlayer = () => activePlayer;

  let gameOver = false;
  let isTie = false; 

  const switchTurn = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
    Gameboard.changeLastPlayer(activePlayer);
  };

  resetBtn.addEventListener('click', () => {
    console.log("you pressed reset");
    Gameboard.resetBoard();

    DisplayController.clearGameboard();
    DisplayController.displayGameboard(Gameboard.board);

    gameOver = false;
    activePlayer = player1;
    Gameboard.changeLastPlayer(activePlayer);

    Gameboard.printBoard();
  })

  



  // GAME START
  DisplayController.displayGameboard(Gameboard.board);

  
  gameboardUI.addEventListener('click', event => {
    if (!gameOver) {
      let target = event.target;
      target.setAttribute('marked', 'true');

      // Access the data-row and data-column attributes
      let row = parseInt(target.getAttribute('data-row'));
      let column = parseInt(target.getAttribute('data-column'));
      let emptyCell = Gameboard.isCellEmpty(row, column);

      if (emptyCell) {
        Gameboard.markCell(row, column, activePlayer.symbol);
        DisplayController.markGameboardUI(target, row, column);

        Gameboard.printBoard();
        gameOver = Gameboard.checkForWin();
        console.log(`gameOver: ${gameOver}`);
        switchTurn();


        // Put row and column information inside variables
        console.log('Row:', row);
        console.log('Column:', column);

      } else {
        console.log("This cell is occuppied!")
        console.log(`Gameboard.board[row][column] = ${Gameboard.board[row][column]} ${emptyCell}`)
        Gameboard.printBoard();
      }
    } 
    
    if (gameOver) {
      alert(`Game over, winner: ${Gameboard.getWinner()}`);
      
    }

    return {
      getActivePlayer
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
})();






// let game = GameController();








// //game start with player one
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();
// markRandomCell();
// switchTurn();



