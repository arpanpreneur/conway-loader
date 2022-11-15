export default class ConwayGame {
    constructor(maxRows, maxCols, initialBoard, loopPattern, painterCb) {
        this.maxRows = maxRows;
        this.maxCols = maxCols;

        this.painterCb = painterCb;
        this.initialBoard = initialBoard;
        this.loopPattern = loopPattern;

        this.isAllDead = false;
        this.isInitialBoardDead = true;

        if (initialBoard && !(maxRows === initialBoard.length && maxCols === initialBoard[0].length)) {
            console.error("Initial Board Given Is = ", initialBoard);
            console.error("maxRows = ", maxRows);
            console.error("maxCols = ", maxCols);
            throw "Invalid Initial Board State";
        }
    }

    init() {
        if (this.initialBoard) {
            this.mainBoard = structuredClone(this.initialBoard);
        } else {
            this.mainBoard = this._makeInitialBoard();
        }

        for (let row = 0; row < this.maxRows; row++) {
            for (let col = 0; col < this.maxCols; col++) {
                this.painterCb(row, col, this.mainBoard[row][col]);
                
                if (this.mainBoard[row][col] !== 0) {
                    this.isInitialBoardDead = false;
                }
            }
        }
        this.startingBoard = structuredClone(this.mainBoard);
    }

    _makeInitialBoard() {
        const board = [];
        for (let row = 0; row < this.maxRows; row++) {
            const rowArr = [];
            for (let col = 0; col < this.maxCols; col++) {
                const val = Math.floor(Math.random() * 2);
                rowArr.push(val);
                this.painterCb(row, col, val);
            }
            board.push(rowArr);
        }

        return board;
    }

    _getNextGeneration() {
        let nextGen;
        if (this.isAllDead && this.loopPattern) {
            nextGen = structuredClone(this.startingBoard);
            this.isAllDead = false;
            return nextGen;
        }
        nextGen = structuredClone(this.mainBoard);

        const getCell = (row, col) => {
            if (row < 0 || row >= this.maxRows || col < 0 || col >= this.maxCols) {
                return 0;
            }

            return this.mainBoard[row][col];
        }
        const getLiveNeighbourCount = (row, col) => {
            return getCell(row-1, col-1) + getCell(row-1, col) + getCell(row-1, col+1)
                +  getCell(row, col-1)   +                       getCell(row, col+1)
                +  getCell(row+1, col-1) + getCell(row+1, col) + getCell(row+1, col+1);
        }
        
        let checkDead = true;
        for (let row = 0; row < this.maxRows; row++) {
            for (let col = 0; col < this.maxCols; col++) {
                const liveNeighbourCount = getLiveNeighbourCount(row, col);
                const cellVal = nextGen[row][col];

                if (cellVal === 1 && liveNeighbourCount < 2) {
                    nextGen[row][col] = 0;
                } else if (cellVal === 1 && liveNeighbourCount > 3) {
                    nextGen[row][col] = 0;
                } else if (cellVal === 0 && liveNeighbourCount === 3) {
                    nextGen[row][col] = 1;
                }

                this.painterCb(row, col, nextGen[row][col]);
                if (nextGen[row][col] !== 0) checkDead = false;
            }
        }

        this.isAllDead = checkDead;
        return nextGen;
    }

    next() {
        if (this.initialBoard && this.isInitialBoardDead) return;
        this.mainBoard = this._getNextGeneration();
    }

    getCurrentCellValue(row, col) {
        return this.mainBoard[row][col];
    } 
}