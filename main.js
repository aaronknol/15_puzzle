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

    const generateBoard = () => {
        // loop through the 2 dimensional array from left to right, then top to bottom
        // inserting a number from cells array in the position currently looped to
        for (var y=0; y <= 3; y++) {
            for (var x=0; x <= 3; x++) {
                //place the first element of the cells array on the board
                
                game_board[y][x] = cells[0];
                var domElement = document.createElement('div');
                domElement.setAttribute('class', 'cell');
                domElement.style.left= x * 50;
                domElement.style.top = y * 50;
                domElement.x = x;
                domElement.y = y;
                domElement.textContent = game_board[y][x];
                board.appendChild(domElement);
                cells.shift();   // remove the first element which was just inserted onto the board
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