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

    let blankCellCordinates = [];

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
                    blankCellCordinates = [y, x];
                }

                shuffledCells.shift();   // remove the first element which was just inserted onto the board
            }
        }
    }

    const init = () => {
        generateBoard()
    }

    return {
        init: init
    }
}

game().init();