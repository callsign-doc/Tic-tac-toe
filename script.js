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

  const isBoardFull = () => {
    return !board.some(row => row.some(cell => cell === ' '));
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

  const getWinner = () => winner === undefined ? 'TIE' : winner;


  const getLastPlayer = () => lastPlayer;
  const changeLastPlayer = (activePlayer) => {
    lastPlayer = activePlayer.symbol;
  }

  const markCell = (row, column, player) => {
    board[row][column] = player;
    lastPlayer = player;
    console.log(`Last player = ${lastPlayer}`);
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
        winner = board[1][1];
        return true;
      };
    }

    return checkHorizontalWin() || checkVerticalWin() || checkDiagonalWin();
  }

  createBoard();

  return { board, getBoard, winner, getWinner, 
    getLastPlayer, changeLastPlayer,
    printBoard, resetBoard, isBoardFull,
    markCell, isCellEmpty,
    checkForWin
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

      if (target.getAttribute('marked') !== 'true') {
        if (symbol === 'X') {
          target.classList.add('grid-item-x');
        } else if (symbol === 'O') {
            target.classList.add('grid-item-o');
        }
        target.textContent = symbol;

        if (target.classList.contains('grid-item-x')) {
          target.style.backgroundColor = '#df5e7e';
          target.style.color = '#eedcdc';
        } else if (target.classList.contains('grid-item-o')) {
            target.style.backgroundColor = '#3075dc';
            target.style.color = '#e3e7fc';
        }
      }

    }
  }
  gameContainer.addEventListener('mouseover', (event) => {
    updateGridItemClass(event);
  });


  const handleMouseOut = (event) => {
    let target = event.target;
    if (target.classList.contains('grid-item')) {
        if (target.getAttribute('marked') !== 'true') {
            target.style.backgroundColor = ''; // Revert to original color (empty string)
            target.classList.remove('grid-item-x', 'grid-item-o');
            target.textContent = ' '; // Reset the content
        } else {
            target.style.backgroundColor = ''; // Revert to original background color
            target.style.color = ''; // Revert to original text color
        }
    }
  };
  gameContainer.addEventListener('mouseout', handleMouseOut);



  const updatePlayerNameDisplay = (player1, player2) => {
    const p1DisplayName = doc.getElementById('player1Name');
    const p2DisplayName = doc.getElementById('player2Name');

    p1DisplayName.textContent = player1.name;
    p2DisplayName.textContent = player2.name;
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

  const renderGameboardUI = (board) => {
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
    displayGameboard: renderGameboardUI, clearGameboard, markGameboardUI,
    updateGridItemClass, updatePlayerNameDisplay
  }
})(document || documentMock);






const GameController = (function() {
  const getCustomPlayerName = (symbol) => {
    let name = prompt(`Player ${symbol}: Enter Name`);
    return name;
  };

  let player1 = {
    name: getCustomPlayerName('X'),
    symbol: 'X',
    moves: 0
  }
  let player2 = {
    name: getCustomPlayerName('O'),
    symbol: 'O',
    moves: 0
  }

  const gameboardUI = document.querySelector('.gameContainer');
  const resetBtn = document.getElementById('resetBtn');

  let activePlayer = player1;
  const getActivePlayer = () => activePlayer;

  let gameOver = false;
  let isTie = false; 

  function generateGameOverMessage() {
    let winner = Gameboard.getWinner();
      if (isTie) {
        alert(`TIE: Between Special Grade Sorcerer ${player1.name} & Special Grade Curse ${player2.name}`);
      } else {
        if (winner === 'X') {
          alert(`Game over, winner, The strongest sorcerer of today: ${player1.name}`);
        } else {
          alert(`Game over, winner, The strongest sorcerer in history: ${player2.name}`);
        }

      }
  }

  const switchTurn = () => {
    activePlayer = (activePlayer === player1) ? player2 : player1;
    Gameboard.changeLastPlayer(activePlayer);
  };

  const resetGame = () => {
    console.log("you pressed reset");
    Gameboard.resetBoard();

    DisplayController.clearGameboard();
    DisplayController.displayGameboard(Gameboard.board);

    gameOver = false;
    activePlayer = player1;
    Gameboard.changeLastPlayer(activePlayer);

    Gameboard.printBoard();
  };


  const handleCellClick = (event) => {
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
            isTie = Gameboard.isBoardFull();
            gameOver = Gameboard.checkForWin() || isTie;

            console.log(`gameOver: ${gameOver}`);
            switchTurn();

            // Put row and column information inside variables
            console.log('Row:', row);
            console.log('Column:', column);

        } else {
            console.log("This cell is occupied!")
            console.log(`Gameboard.board[row][column] = ${Gameboard.board[row][column]} ${emptyCell}`)
            Gameboard.printBoard();
        }
    } 
    
    if (gameOver) {
      generateGameOverMessage();
    }
  };

  




  // GAME START
  DisplayController.displayGameboard(Gameboard.board);
  DisplayController.updatePlayerNameDisplay(player1, player2);

  gameboardUI.addEventListener('click', handleCellClick);

  resetBtn.addEventListener('click', resetGame);

})();










