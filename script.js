const boardSize = 8;
const colors = ['R', 'G', 'B', 'Y', 'P'];
const board = [];
let score = 0;

// 初始化棋盘
function initializeBoard() {
    const gameBoard = document.getElementById('game-board');
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;
    gameBoard.style.gridTemplateRows = `repeat(${boardSize}, 1fr)`;

    for (let row = 0; row < boardSize; row++) {
        board[row] = [];
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.textContent = randomColor();
            board[row][col] = cell.textContent;
            cell.addEventListener('click', selectCell);
            cell.addEventListener('touchstart', selectCell);
            gameBoard.appendChild(cell);
        }
    }
}

// 随机生成颜色
function randomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

// 选择格子
function selectCell(event) {
    const cell = event.target;
    const row = parseInt(cell.dataset.row);
    const col = parseInt(cell.dataset.col);

    // 检查是否可以消除
    if (canEliminate(row, col)) {
        eliminate(row, col);
        updateScore();
        gravity();
    }
}

// 检查是否可以消除
function canEliminate(row, col) {
    // 检查行是否可以消除
    let rowEliminable = true;
    for (let c = 0; c < boardSize; c++) {
        if (board[row][c] === '') {
            rowEliminable = false;
            break;
        }
    }

    // 检查列是否可以消除
    let colEliminable = true;
    for (let r = 0; r < boardSize; r++) {
        if (board[r][col] === '') {
            colEliminable = false;
            break;
        }
    }

    return rowEliminable || colEliminable;
}

// 消除方块
function eliminate(row, col) {
    // 消除行
    for (let c = 0; c < boardSize; c++) {
        if (board[row][c] !== '') {
            board[row][c] = '';
            document.querySelector(`[data-row="${row}"][data-col="${c}"]`).textContent = '';
        }
    }

    // 消除列
    for (let r = 0; r < boardSize; r++) {
        if (board[r][col] !== '') {
            board[r][col] = '';
            document.querySelector(`[data-row="${r}"][data-col="${col}"]`).textContent = '';
        }
    }
}

// 更新分数
function updateScore() {
    score += 100;
    document.getElementById('score-value').textContent = score;
}

// 重力下落
function gravity() {
    for (let col = 0; col < boardSize; col++) {
        let empty = [];
        for (let row = 0; row < boardSize; row++) {
            if (board[row][col] === '') {
                empty.push(row);
            } else if (empty.length > 0) {
                const emptyRow = empty.pop();
                board[emptyRow][col] = board[row][col];
                board[row][col] = '';
                document.querySelector(`[data-row="${emptyRow}"][data-col="${col}"]`).textContent = board[emptyRow][col];
                document.querySelector(`[data-row="${row}"][data-col="${col}"]`).textContent = '';
            }
        }
    }
}

// 主游戏循环
function main() {
    initializeBoard();
}

main();
