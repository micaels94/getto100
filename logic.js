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
        if (!gameStarted) {
            startGame(cell);
        } else {
            isSameCellClicked(cell);
        }
    }

    // function handleCellClickLogic(cell) {

    //     console.log("entering handleCellClickLogic");
    //     isSameCellClicked(cell);
    //     console.log("exiting handleCellClickLogic");
    // }

    function isSameCellClicked(clickedCell) {
        // Compare the innerText of the clicked cell with the last clicked cell
        console.log("Clicked Cell:", clickedCell);
        console.log("Last Clicked Cell:", lastClickedCell);

        if (lastClickedCell === clickedCell) {
            // The user clicked in the same cell consecutively
            // Toggle the display of the number or clear the cell
            if (cellIsEmpty(clickedCell)) {
                // If the cell is empty, display the number
                numCount += 1; // Increment numCount
                clickedCell.style.backgroundColor = "#ffcc00"
                clickedCell.innerText = numCount;
            } else {
                // If the cell has a number, clear it
                numCount -= 1
                clearCell(clickedCell);
            }
            console.log("Same cell clicked");
            return true;
        }

         // Clear the last clicked cell
        lastClickedCell = clickedCell; // Update the last clicked cell
        console.log("Different cell clicked");
        return false;
    }

    function cellIsEmpty(cell) {
        return cell.innerText === '';
    }

    function clearCell(cell) {
        // Reset the cell to its original state
        console.log("This is the clearCell");

        cell.innerText = '';
        cell.style.backgroundColor = 'white';
        console.log("And this is the lastClickedCell after clearCell " + lastClickedCell);
    }

    function isCountExceeded() {
        return numCount >= 101;
    }

    function startGame(startingCell) {
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        lastClickedCell = startingCell; // Store the cell reference
        gameStarted = true; // Set gameStarted to true
        console.log("this is the lastClickedCell " + lastClickedCell);
    }
});
