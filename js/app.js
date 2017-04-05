document.addEventListener('DOMContentLoaded', function() {


    function GameOfLife(boardWidth, boardHeight) {

        this.height = boardHeight;
        this.width = boardWidth;
        this.board = document.querySelector('#board');
        this.cells = [];
        this.boardState = [];

    }


    GameOfLife.prototype.createBoard = function() {

        this.board.style.width = this.width * 10 + 'px';
        this.board.style.height = this.height * 10 + 'px';
        this.numberOfCells = this.width * this.height;

        for (i = 0; i < this.numberOfCells; i++) {
            var div = '<div></div>'
            this.board.innerHTML += div;

        }
        this.cells = Array.prototype.slice.call(document.querySelectorAll('#board div'));

        this.cells.forEach(function(cell, index) {

            cell.addEventListener('click', function() {

                if (this.className === 'live') {

                    this.classList.remove('live');
                } else {

                    this.classList.add('live');

                }


            });
        });
    };

    GameOfLife.prototype.getCell = function(x, y) {

        var index = (x - 1) + ((y - 1) * this.width);
          console.log(this.cells[index]);
        return this.cells[index];
    }

    GameOfLife.prototype.cellSetState = function(x, y, state) {
        if (this.getCell(x, y).className === state) {
            this.getCell(x, y).classList.remove(state);

        } else {

            this.getCell(x, y).classList.add(state);

        }


    }

    GameOfLife.prototype.firstGlider = function() {

        this.cellSetState(3, 1, 'live');
        this.cellSetState(4, 6, 'live');
        this.cellSetState(1, 11, 'live');
        this.cellSetState(12, 3, 'live');
        this.cellSetState(4, 5, 'live');

    }

    GameOfLife.prototype.computeCellNextState = function(x, y) {
        var livingCells = 0;

        if (this.getCell(x - 1, y - 1).className === 'live') {
            livingCells++;
        }

        if (this.getCell(x, y - 1).className === 'live') {
            livingCells++;
        }

        if (this.getCell(x + 1, y - 1).className === 'live') {
            livingCells++;
        }

        if (this.getCell(x - 1, y).className === 'live') {
            livingCells++;
        }

        if (this.getCell(x + 1, y).className === 'live') {
            livingCells++;
        }
        if (this.getCell(x - 1, y + 1).className === 'live') {
            livingCells++;
        }

        if (this.getCell(x, y + 1).className === 'live') {
            livingCells++;
        }
        if (this.getCell(x + 1, y + 1).className === 'live') {
            livingCells++;
        }

        if (livingCells === 2 || livingCells === 3) {

            return 1;
        }

        return 0;

    }

    GameOfLife.prototype.computeNextGeneration = function() {

        for (var i = 1; i <= this.height.length; i++) {

            for (var j = 1; j <= this.width.length; j++) {

                this.boardState.push(this.computeCellNextState(j, i));
            }


        }

    }


    var game = new GameOfLife(15, 15);
    game.createBoard();
    game.firstGlider();
    game.computeNextGeneration();
    console.log(game.boardState);








});
