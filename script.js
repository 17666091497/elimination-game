const boardSize = 8;
const colors = ['R', 'G', 'B', 'Y', 'P'];
const board = [];
let selectedCell = null;

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
    if (selectedCell) {
        swapCells(selectedCell, cell);
        selectedCell.classList.remove('selected');
        selectedCell = null;
    } else {
        selectedCell = cell;
        selectedCell.classList.add('selected');
    }
}

// 交换两个格子
function swapCells(cell1, cell2) {
    const row1 = parseInt(cell1.dataset.row);
    const col1 = parseInt(cell1.dataset.col);
    const row2 = parseInt(cell2.dataset.row);
    const col2 = parseInt(cell2.dataset.col);

    // 交换颜色
    const temp = board[row1][col1];
    board[row1][col1] = board[row2][col2];
    board[row2][col2] = temp;

    // 更新DOM
    cell1.textContent = board[row1][col1];
    cell2.textContent = board[row2][col2];

    // 检查并消除
    if (!checkAndEliminate()) {
        // 如果没有消除，恢复交换
        swapCells(cell1, cell2);
    }
}

// 检查并消除连续的3个或以上相同颜色的格子
function checkAndEliminate() {
    let eliminated = false;

    // 检查横向
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize - 2; col++) {
            if (board[row][col] === board[row][col + 1] && board[row][col] === board[row][col + 2] && board[row][col] !== '') {
                board[row][col] = board[row][col + 1] = board[row][col + 2] = '';
                document.querySelector(`[data-row="${row}"][data-col="${col}"]`).textContent = '';
                document.querySelector(`[data-row="${row}"][data-col="${col + 1}"]`).textContent = '';
                document.querySelector(`[data-row="${row}"][data-col="${col + 2}"]`).textContent = '';
                eliminated = true;
            }
        }
    }

    // 检查纵向
    for (let col = 0; col < boardSize; col++) {
        for (let row = 0; row < boardSize - 2; row++) {
            if (board[row][col] === board[row + 1][col] && board[row][col] === board[row + 2][col] && board[row][col] !== '') {
                board[row][col] = board[row + 1][col] = board[row + 2][col] = '';
                document.querySelector(`[data-row="${row}"][data-col="${col}"]`).textContent = '';
                document.querySelector(`[data-row="${row + 1}"][data-col="${col}"]`).textContent = '';
                document.querySelector(`[data-row="${row + 2}"][data-col="${col}"]`).textContent = '';
                eliminated = true;
            }
        }
    }

    return eliminated;
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