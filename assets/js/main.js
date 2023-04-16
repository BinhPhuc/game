// Init
let boxes = Array.from(document.getElementsByClassName('box'));
let restartBtn = document.getElementById('rstbtn');
let text = document.getElementById('game-name')
const X = "X";
const O = "O";
let currentPlayer = X;
let boardGame = Array(9).fill(null);
let hasWon = false;

function start() {
    boxes.forEach(box => box.addEventListener("click", clicked));
}

function clicked(e) {
    let index = e.target.id;
    if(!boardGame[index]) {
        boardGame[index] = currentPlayer;
        e.target.innerText = currentPlayer;
        if(playerTurnHandle()) {
            text.innerText = `${currentPlayer} thang roi dit me thang ngu!`
        }
        currentPlayer = (currentPlayer === X ? O : X);
    }
}

// Begin restart button logic

restartBtn.addEventListener('click', restartGame);
function restartGame(e) {
    boardGame.fill(null);
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].innerText = '';
    }
    currentPlayer = X;
    text.innerText = 'Tic-tac-toe';
}

// End restart button logic

const combo = [
    [0, 1, 2], // first row
    [3, 4, 5], // second row
    [6, 7, 8], // third row
    [0, 3, 6], // first column
    [1, 4, 7], // second column
    [2, 5, 7], // third column
    [0, 4, 8], // left cross
    [2, 4, 6], // right cross
];

function playerTurnHandle() {
    for(let i = 0; i < combo.length; i++) {
        let curMove = boardGame[combo[i][0]];
        if(curMove == null) continue;
        let cnt = 0;
        for(let j = 1; j < combo[i].length; j++) {
            if(boardGame[combo[i][j]] == null) break;
            if(boardGame[combo[i][j]] == curMove) cnt++;
        }
        if(cnt === 2) return true;
    }
    return false;
}

start();    