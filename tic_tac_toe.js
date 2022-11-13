const grid = document.getElementById("table");
const result = document.querySelector(".output");

let table = new Array(4);
let freqTable = new Array(4)
let clickCnt = 0;
let end = false;

createTable();

function createTable() {
    for (let i = 0; i < 4; ++i) {
        table[i] = new Array(4);
        freqTable[i] = new Array(4);
    }
    for (let i = 1; i <= 3; ++i) {
        const row = document.createElement("tr");
        for (let j = 1; j <= 3; ++j) {   
            table[i][j] = document.createElement("td");
            table[i][j].id = Number(i * 10 + j);
            row.appendChild(table[i][j]);
            table[i][j].addEventListener('click', fillTable);
            freqTable[i][j] = 0;
        }
        grid.appendChild(row);
    }
}

function fillTable() {
    ++clickCnt;
    if (clickCnt % 2 != 0 && !freqTable[Math.trunc(this.id / 10)][this.id % 10] && !end) {
        table[Math.trunc(this.id / 10)][this.id % 10].textContent = "X";
        freqTable[Math.trunc(this.id / 10)][this.id % 10] = 1;
    } else if (!freqTable[Math.trunc(this.id / 10)][this.id % 10] && !end) {
        table[Math.trunc(this.id / 10)][this.id % 10].textContent  = "O";
        freqTable[Math.trunc(this.id / 10)][this.id % 10] = 1;
    }
    if (clickCnt >= 5 && !end) {
        checkTable();
    }
}

function checkTable() {
    for (let checkCnt = 1; checkCnt <= 2 && !end; ++checkCnt) {
        for (let i = 1; i <= 3 && !end; ++i) {
            let xCnt = 0, oCnt = 0;
            for (let j = 1; j <= 3 && !end; ++j) {
                if (checkCnt === 1) {
                    if (table[i][j].textContent === "X") {
                        ++xCnt;
                    } else if (table[i][j].textContent === "O") {
                        ++oCnt;
                    }
                } else {
                    if (table[j][i].textContent === "X") {
                        ++xCnt;
                    } else if (table[j][i].textContent === "O") {
                        ++oCnt;
                    }
                }
            }
            checkWinner(xCnt, oCnt);    
        }
    }
    for (let checkCnt = 1; checkCnt <= 2 && !end; ++checkCnt) {
        let colIncr = 1, colStart = 1;
        if (checkCnt === 2) {
            colIncr = -1;
            colStart = 3;
        }
        let xCnt = 0, oCnt = 0;
        for (let i = 1, j = colStart; i <= 3; ++i, j += colIncr) {
            if (table[i][j].textContent === "X") {
                ++xCnt;
            } else if (table[i][j].textContent === "O") {
                ++oCnt;
            }
        }
        checkWinner(xCnt, oCnt); 
    }
}

function checkWinner(xCnt, oCnt) {
    if (xCnt === 3 || oCnt === 3) {
        end = true;
        let winnerSymbol = null;
        if (xCnt === 3) {
            winnerSymbol = "X"
        } else if (oCnt == 3) {
            winnerSymbol = "O"
        }
        result.textContent = "Player with " + winnerSymbol + " won the game";
        newGame();
    } else if (clickCnt === 9) {
        end = true;
        result.textContent = "It's a draw";
        newGame();
    }
}

function newGame() {
    const startAgain = document.createElement("button");
    document.body.append(startAgain);
    startAgain.setAttribute("class", "newGame");
    startAgain.textContent = "START AGAIN";
    startAgain.addEventListener('click', resetGame)    
}

function resetGame() {
    window.location.reload();
}