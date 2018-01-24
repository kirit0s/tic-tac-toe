'use strict';

// Variables
const TIC = 'ch';
const TAC = 'r';

const undoButton = document.querySelector('.undo-btn');
const redoButton = document.querySelector('.redo-btn');

const FIRST_PLAYER = TIC;
let gameMoves = [];
let timeMachine = [];

// Functions
function getCurrentPlayer() {
  if (gameMoves.length === 0) {
    return FIRST_PLAYER;
  } else {
    return gameMoves.slice(-1)[0].player === TIC ? TAC : TIC;
  }
}

function undoMove() {
  const move = gameMoves.pop();
  timeMachine.push(move);
  const cell = document.querySelector(`[data-id="${move.index}"]`);
  cell.classList.remove(move.player);
  checkUndoRedo();
}

function redoMove() {
  const move = timeMachine.pop();
  gameMoves.push(move);
  const cell = document.querySelector(`[data-id="${move.index}"]`);
  cell.classList.add(move.player);
  checkUndoRedo();
}

function checkUndoRedo() {
  undoButton.disabled = !gameMoves.length;
  redoButton.disabled = !timeMachine.length;
}

function makeMove(cell) {
  let currentPlayer = getCurrentPlayer();
  gameMoves.push({
    player: currentPlayer,
    index: cell.dataset.id
  });
  cell.classList.add(currentPlayer);
  timeMachine = [];
  checkUndoRedo();
  console.log(gameMoves.slice(-1)[0]);
}

function checkWin(params) {}

// Listeners
field.addEventListener('click', event => {
  if (event.target.className === 'cell') {
    makeMove(event.target);
  } else {
    event.stopPropagation();
  }
});

undoButton.addEventListener('click', () => undoMove());

redoButton.addEventListener('click', () => redoMove());
