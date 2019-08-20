var game = () => {

    const board = document.querySelector('.board');
            
    // initial 2 dimensional array of the board
    let game_board = [
        [1, 2, 3, 4],
        [5, 6, 7, 8],
        [9, 10, 11, 12],
        [13, 14, 15, null]
    ];

    const cells = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, null];

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
        domElement.style.left= x * 50 + 'px';
        domElement.style.top = y * 50 + 'px';
        domElement.x = x;
        domElement.y = y;
        domElement.textContent = game_board[y][x];

        return domElement;
    }

    moveCells = (target, xCoordinate, yCoordinate, direction) => {
        
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

    boardClickHandler = (e) => {console.log('click')
        const xCoordinate = e.target.x;
        const yCoordinate = e.target.y;

        // moving down
        if (xCoordinate === blankCellCoordinates[1]) {
            if (yCoordinate + 1 === blankCellCoordinates[0]) {
                moveCells(e.target, xCoordinate, yCoordinate, 'down');
            }
        }

        // moving up
        if (xCoordinate === blankCellCoordinates[1]) {
            if (yCoordinate - 1 === blankCellCoordinates[0]) {
                moveCells(e.target, xCoordinate, yCoordinate, 'up');
            }
        }

        // moving left
        if (xCoordinate -1 === blankCellCoordinates[1]) {
            if (yCoordinate === blankCellCoordinates[0]) {
                moveCells(e.target, xCoordinate, yCoordinate, 'left');
            }
        }

        // moving right
        if (xCoordinate +1 === blankCellCoordinates[1]) {
            if (yCoordinate === blankCellCoordinates[0]) {
                moveCells(e.target, xCoordinate, yCoordinate, 'right');
            }
        }
        
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
    }

    const init = () => {
        generateBoard()
    }

    return {
        init: init
    }
}

game().init();