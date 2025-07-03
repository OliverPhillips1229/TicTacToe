//1) Define the required variables used to track the state of the game.

//2) Store cached element references.

//3) Upon loading, the game state should be initialized, and a function should 
//   be called to render this game state.

//4) The state of the game should be rendered to the user.

//5) Define the required constants.

//6) Handle a player clicking a square with a `handleClick` function.

//7) Create Reset functionality.


/*-------------------------------- Constants --------------------------------*/
const winningCombos = 
[[0, 1, 2], // Top row
[3, 4, 5], // Middle row
[6, 7, 8], // Bottom row
[0, 3, 6], // Left column
[1, 4, 7], // Middle column
[2, 5, 8], // Right column
[0, 4, 8], // Diagonal top-left to bottom-right
[2, 4, 6]  // Diagonal top-right to bottom-left
]

/*---------------------------- Variables (state) ----------------------------*/
let board;
let turn;
let winner;
let tie;

/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.sqr');
const messageEl = document.querySelector('#message');
const resetBtnEl = document.querySelector('#reset');

/*-------------------------------- Functions --------------------------------*/
function updateBoard() {
  board.forEach((value, index) => {
    squareEls[index].textContent = value;
  });
}
function updateMessage() {
    if (!winner && !tie) {
        messageEl.textContent = `It's ${turn}'s turn!`;
    } else if (!winner && tie) {
        messageEl.textContent = `It's a tie!`;
    } else {
        messageEl.textContent = `Congrats ${turn}, you won!`;
    }
}
function render() {
    updateBoard();
    updateMessage();
}
function handleClick(event) {
  const squareIndex = Number(event.target.id);
  if (board[squareIndex] !== '' || winner) return;
  placePiece(squareIndex);
  checkForWinner();
  checkForTie();
  switchPlayerTurn();
  render();
}
function placePiece(index) {
  board[index] = turn;
  console.log(board); // for testing
}
function checkForWinner() {
  winningCombos.forEach((combo) => {
    const [a, b, c] = combo;
    if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
      winner = true;
    }
  });
  console.log('Winner:', winner);
}
function checkForTie() {
  if (winner) return;
  if (!board.includes('')) {
    tie = true;
  }
  console.log('Tie:', tie);
}
function switchPlayerTurn() {
  if (winner) return;
  turn = (turn === 'X') ? 'O' : 'X';
  console.log('Turn:', turn); // for testing
}
function init() {
    board = ['', '', '', '', '', '', '', '', '']; // Step 1: Set board to an array of 9 empty strings
    turn = 'X'; // Step 2: Set turn to "X"
    winner = false; // Step 3: Set winner to false
    tie = false ;// Step 4: Set tie to false
    render() // Step 6: Call render()
}

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(square => {
  square.addEventListener('click', handleClick);
});
resetBtnEl.addEventListener('click', init); // reset button
init()

