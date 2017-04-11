document.addEventListener('DOMContentLoaded', function() {

    const GameOfLife = {

        init(boardWidth, boardHeight) {

            this.height = boardHeight;
            this.width = boardWidth;
            this.board = document.querySelector('#board');
            this.cells = [];
            this.boardState = [];


        },

        run() {

            this.createBoard();
            this.firstGlider();
        },

        createBoard() {

            this.board.style.width = this.width * 10 + 'px';
            this.board.style.height = this.height * 10 + 'px';
            this.numberOfCells = this.width * this.height;

            for (let i = 0; i < this.numberOfCells; i++) {
                const div = '<div></div>'
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

        },

        getCell(x, y) {

            const index = (x - 1) + ((y - 1) * this.width);

            return this.cells[index];
        },

        cellSetState(x, y, state) {


            if (this.getCell(x, y).className === state) {
                this.getCell(x, y).classList.remove(state);

            } else {

                this.getCell(x, y).classList.add(state);

            }

        },

        firstGlider() {

            this.cellSetState(3, 1, 'live');
            this.cellSetState(4, 6, 'live');
            this.cellSetState(1, 11, 'live');
            this.cellSetState(12, 3, 'live');
            this.cellSetState(4, 5, 'live');

        },

        computeCellNextState(x, y) {


            let livingCells = 0;

            var neighbours = [this.getCell(x - 1, y - 1), this.getCell(x, y - 1), this.getCell(x + 1, y - 1), this.getCell(x - 1, y), this.getCell(x + 1, y), this.getCell(x - 1, y + 1), this.getCell(x, y + 1), this.getCell(x + 1, y + 1)];

            for (let i = 0; i < neighbours.length; i++) {

                if (neighbours[i] !== undefined && neighbours[i].className === "live") {

                    livingCells++;
                }

            }


            if (livingCells === 2 || livingCells === 3) {
                return 1;
            }

            return 0;
        },

        computeNextGeneration() {

            this.boardState = [];
            for (let i = 1; i <= this.height; i++) {

                for (let j = 1; j <= this.width; j++) {

                    this.boardState.push(this.computeCellNextState(j, i));
                }


            }
        },


        printNextGeneration() {

            for (var i = 0; i < this.boardState.length; i++) {

                if (this.boardState[i] === 1 && this.cells[i].className !== 'live') {

                    this.cells[i].classList.add('live');


                } else if (this.boardState[i] === 0 && this.cells[i].className === 'live')
                    this.cells[i].classList.remove('live');
            }
        },

        nextGenFn() {

            this.computeNextGeneration();
            this.printNextGeneration();
        },

        runInterval(fn) {


            this.myInterval = setInterval(fn.bind(this), 500);
        }



    }


    document.querySelector('#play').addEventListener('click', function(e) {

        e.preventDefault();
        const width = document.querySelector('#board-width').value;
        const height = document.querySelector('#board-height').value;
        game.init(width, height);
        game.run();
        game.runInterval(game.nextGenFn);


    });

    document.querySelector('#pause').addEventListener('click', function(e) {

        e.preventDefault();
        clearInterval(game.myInterval);

    });


    const game = Object.create(GameOfLife);





});
