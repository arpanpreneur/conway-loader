export default class ConwayGame {
    constructor(maxRows, maxCols, initialBoard, painterCb) {
        this.maxRows = maxRows;
        this.maxCols = maxCols;

        this.painterCb = painterCb;
        this.initialBoard = initialBoard;
        if (initialBoard && !(maxRows === initialBoard.length && maxCols === initialBoard[0].length)) {
            throw "Invalid Initial Board State";
        }
    }

    init() {
        if (this.initialBoard) {
            this.mainBoard = this.initialBoard;
            for (let row = 0; row < this.maxRows; row++) {
                for (let col = 0; col < this.maxCols; col++) {
                    this.painterCb(row, col, this.initialBoard[row][col]);
                }
            }    
        } else {
            this.mainBoard = this._makeInitialBoard();
        }
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
        const nextGen = structuredClone(this.mainBoard);

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
            }
        }

        return nextGen;
    }

    next() {
        this.mainBoard = this._getNextGeneration();
    }

    getCurrentCellValue(row, col) {
        return this.mainBoard[row][col];
    } 
}