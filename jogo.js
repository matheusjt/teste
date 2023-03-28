const board = document.querySelector('.board');
const message = document.querySelector('.message');
let turn = 'X';
let gameOver = false;
let moves = 0;
let boardState = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

// cria o tabuleiro do jogo
for (let i = 0; i < 9; i++) {
  let cell = document.createElement('div');
  cell.classList.add('cell');
  cell.dataset.row = Math.floor(i / 3);
  cell.dataset.col = i % 3;
  cell.addEventListener('click', handleCellClick);
  board.appendChild(cell);
}

// função que trata o clique em uma célula
function handleCellClick(event) {
  if (gameOver) return;

  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (boardState[row][col] !== '') return;

  boardState[row][col] = turn;
  event.target.textContent = turn;

  if (checkWinner()) {
    gameOver = true;
    message.textContent = `${turn} ganhou!`;
  } else if (++moves === 9) {
    gameOver = true;
    message.textContent = 'Empate!';
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    message.textContent = `É a vez de ${turn}`;
  }
}

// função que verifica se alguém ganhou
function checkWinner() {
  // verifica as linhas
  for (let i = 0; i < 3; i++) {
    if (boardState[i][0] === boardState[i][1] && boardState[i][0] === boardState[i][2] && boardState[i][0] !== '') {
      return true;
    }
  }

  // verifica as colunas
  for (let i = 0; i < 3; i++) {
    if (boardState[0][i] === boardState[1][i] && boardState[0][i] === boardState[2][i] && boardState[0][i] !== '') {
      return true;
    }
  }
  
  if (boardState[0][0] === boardState[1][1] && boardState[0][0] === boardState[2][2] && boardState[0][0] !== '') {
    return true;
  }

  // verifica a diagonal secundária
  if (boardState[0][2] === boardState[1][1] && boardState[0][2] === boardState[2][0] && boardState[0][2] !== '') {
    return true;
  }

  return false;
}