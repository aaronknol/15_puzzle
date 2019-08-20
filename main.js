var game = () => {

    const board = document.querySelector('.board');
            
    // initial 2 dimensional array of the board
    let game_board = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null]
    ];

    let cells = Array[16];

    let blankCellCoordinates;

    // shuffle the 16 item array aroudn into random order
    // taken from stack overflow: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    const shuffle = (a) => {
        for (let i = a.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
    }

    const createElement = (x, y) => {
        const domElement = document.createElement('div');
        domElement.setAttribute('class', 'cell');
        domElement.setAttribute('tabindex', '0');
        domElement.style.left= x * 50 + 'px';
        domElement.style.top = y * 50 + 'px';
        domElement.x = x;
        domElement.y = y;
        domElement.textContent = game_board[y][x];

        return domElement;
    }

    const moveCells = (target, xCoordinate, yCoordinate, direction) => {
        
        game_board[yCoordinate][xCoordinate] = null;
        game_board[blankCellCoordinates[0]][blankCellCoordinates[1]] =  parseInt(target.textContent, 10);

        setBlankCoords(yCoordinate, xCoordinate);

        var targetEl = (blankCellCoordinates[0] * 4) + (blankCellCoordinates[1]);

        if (direction === 'down') {
            target.style.top =  parseInt(target.style.top, 10) + 50 + 'px';
            target.y = target.y + 1;
        }

        if (direction === 'up') {
            target.style.top =  parseInt(target.style.top, 10) - 50 + 'px';
            target.y = target.y - 1;
        }

        if (direction === 'left') {
            target.style.left =  parseInt(target.style.left, 10) - 50 + 'px';
            target.x = target.x - 1;
        }

        if (direction === 'right') {
            target.style.left =  parseInt(target.style.left, 10) + 50 + 'px';
            target.x = target.x + 1;
        }
    }

    const boardClickHandler = (e) => {
        const xCoordinate = e.target.x;
        const yCoordinate = e.target.y;

        if (canMove(xCoordinate, yCoordinate, 'down')) {
            moveCells(e.target, xCoordinate, yCoordinate, 'down');
        }

        // moving up
        if (canMove(xCoordinate, yCoordinate, 'up')) {
            moveCells(e.target, xCoordinate, yCoordinate, 'up');
        }

        // moving left
        if (canMove(xCoordinate, yCoordinate, 'left')) {
            moveCells(e.target, xCoordinate, yCoordinate, 'left');
        }

        // moving right
        if (canMove(xCoordinate, yCoordinate, 'right')) {
            moveCells(e.target, xCoordinate, yCoordinate, 'right');
        }
        
        checkIfWon();
    }

    const canMove = (xCoordinate, yCoordinate, direction) => {
        if (direction === 'down') {
            if (xCoordinate === blankCellCoordinates[1]) {
                if (yCoordinate + 1 === blankCellCoordinates[0]) {
                    return true;
                }
            }
        }

        if (direction === 'up') {
            if (xCoordinate === blankCellCoordinates[1]) {
                if (yCoordinate - 1 === blankCellCoordinates[0]) {
                    return true;
                }
            }
        }

        if (direction === 'left') {
            if (xCoordinate -1 === blankCellCoordinates[1]) {
                if (yCoordinate === blankCellCoordinates[0]) {
                    return true;
                }
            }
        }

        if (direction === 'right') {
            if (xCoordinate +1 === blankCellCoordinates[1]) {
                if (yCoordinate === blankCellCoordinates[0]) {
                    return true;
                }
            }
        }
    }

    const boardKeyHandler = (e) => {
        const xCoordinate = e.target.x;
        const yCoordinate = e.target.y;

        // down
        if (e.keyCode === 40) {
            if (canMove(xCoordinate, yCoordinate, 'down')) {
                moveCells(e.target, xCoordinate, yCoordinate, 'down');
            }
        }

        // up
        if (e.keyCode === 38) {
            if (canMove(xCoordinate, yCoordinate, 'up')) {
                moveCells(e.target, xCoordinate, yCoordinate, 'up');
            }
        }

        // left
        if (e.keyCode === 37) {
            if (canMove(xCoordinate, yCoordinate, 'left')) {
                moveCells(e.target, xCoordinate, yCoordinate, 'left');
            }
        }

        // right
        if (e.keyCode === 39) {
            if (canMove(xCoordinate, yCoordinate, 'right')) {
                moveCells(e.target, xCoordinate, yCoordinate, 'right');
            }
        }
    }

    const clearBoard = () => {
        board.innerHTML = '';
    }

    const checkIfWon = () => {
        const winningGameBoard = [
            [1, 2, 3, 4],
            [5, 6, 7, 8],
            [9, 10, 11, 12],
            [13, 14, 15, null]
        ];

        if (JSON.stringify(winningGameBoard) === JSON.stringify(game_board)) {
            if(window.confirm('Congratulations! You have solved the puzzle! Would you like to play again?')) {
                clearBoard();
                init();
            }
        }
    }

    const generateCells = () => {
        cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];
    }

    const setBlankCoords = (y, x) => {
        blankCellCoordinates = [y, x];
    }

    const generateBoard = () => {
        // loop through the 2 dimensional array from left to right, then top to bottom
        // inserting a number from cells array in the position currently looped to

        const shuffledCells = shuffle(cells);

        for (var y=0; y <= 3; y++) {
            for (var x=0; x <= 3; x++) {
                //place the first element of the cells array on the board
                
                game_board[y][x] = shuffledCells[0];

                // if the element at x,y is null (representing the 'blank' cell), don't create an element for it
                if (game_board[y][x] !== null) {
                    board.appendChild(createElement(x, y));
                } else {
                    setBlankCoords(y, x);
                }

                shuffledCells.shift();   // remove the first element which was just inserted onto the board
            }
        }

        board.addEventListener('click', boardClickHandler);
        board.addEventListener('keyup', boardKeyHandler);
    }

    const init = () => {
        generateCells();
        generateBoard();
    }

    return {
        init: init
    }
}

game().init();