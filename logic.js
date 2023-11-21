document.addEventListener('DOMContentLoaded', function () {
    let currentPosition;
    let gameStarted = false;
    let numCount = 1;
    let lastClickedCell; // Variable to store the last clicked cell

    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', function () {
            handleCellClick(cell);
        });
    });

    function handleCellClick(cell) {
        console.log("Entering handleCellClick");
        if (!gameStarted) {
            startGame(cell);
            console.log("Game Started");
        } else {
            handleCellClickLogic(cell);
        }
        console.log("Exiting handleCellClick");
    }

    function handleCellClickLogic(cell) {
        if (isSameCellClicked(cell)) {
            console.log("same cell clicked");
            // The user clicked in the same cell consecutively
            // Clear the innerText and set background color to white
            clearCell(cell);
        } else if (!cellIsEmpty(cell) && !isCountExceeded()) {
            console.log("This is a cell argument: " + cell)
            updateGrid(cell, numCount);
            currentPosition = numCount;
            numCount += 1;
            console.log("not if statement called");
        }
    }

    function cellIsEmpty(cell) {
        return cell.innerText === '';
    }

    function isSameCellClicked(clickedCell) {
        let cellClicked = parseInt(clickedCell.innerText);
        console.log(cellClicked);
    
        // Compare the clicked cell with the last clicked cell by their content
        if (lastClickedCell == cellClicked) {
            numCount -= 1; // Decrement numCount by 1
            return true;
        }
        return false;
    }
    
    function isCountExceeded() { // esta função está a funcionar
        return numCount >= 101;
    }

    function startGame(startingCell) {
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        lastClickedCell = startingCell; // Store the cell reference
        gameStarted = true; // Set gameStarted to true
    }

    function updateGrid(clickedCell, numCount) {
        // Place the next number in the clicked cell
        console.log("this is the number being incremented");
        console.log(clickedCell)
        clickedCell.innerText = numCount.toString();
        clickedCell.style.backgroundColor = "#e9c46a";
        lastClickedCell = clickedCell; // Update the last clicked cell
    }
console.log("This is the var lastClickedCell " + lastClickedCell)
    function clearCell(cell) {
        // Reset the cell to its original state
        console.log("This is the clearCell");
        cell.innerText = '';
        cell.style.backgroundColor = 'white';
        lastClickedCell = null; // Reset the last clicked cell
    }
});
