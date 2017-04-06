document.addEventListener('DOMContentLoaded', function() {


    function GameOfLife(boardWidth, boardHeight) {

        this.height = boardHeight;
        this.width = boardWidth;
        this.board = document.querySelector('#board');
        this.cells = [];
        this.boardState = [];


    }
    GameOfLife.prototype.start = function() {

        this.createBoard();
        this.firstGlider();


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

        var neighbours = [this.getCell(x - 1, y - 1), this.getCell(x, y - 1), this.getCell(x + 1, y - 1), this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x - 1, y + 1), this.getCell(x, y + 1), this.getCell(x + 1, y + 1)];

        for (var i = 0; i < neighbours.length; i++) {

            if (neighbours[i] !== undefined && neighbours[i].className === "live") {

                livingCells++;
            }

        }


        if (livingCells === 2 || livingCells === 3) {
            return 1;
        }

        return 0;



    }

    GameOfLife.prototype.computeNextGeneration = function() {
        this.boardState = [];
        for (var i = 1; i <= this.height; i++) {

            for (var j = 1; j <= this.width; j++) {

                this.boardState.push(this.computeCellNextState(j, i));
            }


        }

    }

    GameOfLife.prototype.printNextGeneration = function() {

        for (var i = 0; i < this.boardState.length; i++) {

            if (this.boardState[i] === 1 && this.cells[i].className !== 'live') {

                this.cells[i].classList.add('live');


            } else if (this.boardState[i] === 0 && this.cells[i].className === 'live')
                this.cells[i].classList.remove('live');
        }

    }

    GameOfLife.prototype.nextGenFn = function() {

        this.computeNextGeneration();
        this.printNextGeneration();

    }

    GameOfLife.prototype.runInterval = function() {

        this.nextGenFn = this.nextGenFn.bind(this);
        setInterval(this.nextGenFn, 500);

    }


    document.querySelector('#play').addEventListener('click', function(e) {

        e.preventDefault();

        game.runInterval();

    });

    document.querySelector('#pause').addEventListener('click', function(e) {

        e.preventDefault();
        clearInterval(game.runInterval);

    });


    var game = new GameOfLife(15, 15);
    game.start();




});
