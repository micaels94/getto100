document.addEventListener('DOMContentLoaded', function () {
    let currentPosition;
    let gameStarted = false;
    let numCount = 1; // Initialize numCount to 1

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', function () {
            if (!gameStarted) {
                startGame(cell);
                gameStarted = true;
            } else {
                if (!cellIsEmpty(cell) && !isSameCellClicked(cell) && !isCountExceeded()) {
                    updateGrid(cell, numCount);
                    highlightValidMoves(currentPosition);
                    currentPosition = numCount;
                    numCount += 1;
                    console.log("It should be doing something this part.")
                }
            }
        });
    });

    function cellIsEmpty(cell) {
        return cell.innerText === '';
    }

    function isSameCellClicked(cell) {
        return currentPosition === parseInt(cell.innerText, 10);
    }

    function isCountExceeded() {
        return numCount > 100;
    }

    function startGame(startingCell) {
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        highlightValidMoves(currentPosition);
        numCount += 1;
    }

    function updateGrid(clickedCell, numCount) {
        // Check if the cell is not empty
        if (!cellIsEmpty(clickedCell)) {
            // Reset the cell to its original state
            clickedCell.innerText = '';
            clickedCell.style.backgroundColor = 'white';
        } else {
            // Place the next number in the clicked cell
            clickedCell.innerText = numCount.toString();
            clickedCell.style.backgroundColor = "#e9c46a";
        }
        console.log('After updateGrid logic');
        console.log("This update grid: " + numCount);
    }

    function highlightValidMoves(currentPosition) {
        const cells = document.querySelectorAll('.grid-cell');
        cells.forEach(cell => {
            if (isValidMove(cell, currentPosition)) {
                console.log("Is this even being called?")
                cell.classList.add('valid-move');
            } else {
                cell.classList.remove('valid-move');
            }
        });
    }

    function isValidMove(clickedCell, currentPosition) {
        if (!currentPosition) {
            return false; // The first move is not a valid move
        }

        const clickedNumber = parseInt(clickedCell.textContent, 10);
        const rowDiff = Math.abs(getRow(currentPosition) - getRow(clickedNumber));
        const colDiff = Math.abs(getCol(currentPosition) - getCol(clickedNumber));

        return (rowDiff === 2 && colDiff === 0) || (colDiff === 2 && rowDiff === 0) || (rowDiff === 1 && colDiff === 1);
    }

    function getRow(number) {
        return Math.floor((number - 1) / 10);
    }

    function getCol(number) {
        return (number - 1) % 10;
    }
});
