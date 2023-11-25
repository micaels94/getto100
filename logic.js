

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


    function isSameCellClicked(clickedCell) {
        // Compare the innerText of the clicked cell with the last clicked cell
        console.log("Clicked Cell:", clickedCell);
        console.log("Last Clicked Cell:", lastClickedCell);

        
            if (cellIsEmpty(clickedCell) && isValidMove(clickedCell)) {
                // If the cell is empty, display the number
                numCount += 1; // Increment numCount
                clickedCell.style.backgroundColor = "#ffcc00"
                clickedCell.innerText = numCount;
            } else {
                // If the cell has a number, clear it
               
                clearCell(clickedCell);
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
        // Reset the cell to its original state only if it's the last clicked cell
        console.log("This is the clearCell");
    
        if (lastClickedCell === cell) {
            numCount -= 1
            cell.innerText = '';
            cell.style.backgroundColor = 'white';
            lastClickedCell = null; // Reset the last clicked cell
            console.log("Cleared the cell");
        } else {
            console.log("Cannot clear this cell");
        }
        console.log("And this is the lastClickedCell after clearCell " + lastClickedCell);
    }

    function isValidMove(clickedCell) {
        console.log("Entering isValidMove");
        
        // Get the row and column indices of the clicked cell
        const clickedRow = parseInt(clickedCell.dataset.row);
        const clickedCol = parseInt(clickedCell.dataset.col);
    
        // Get the row and column indices of the last clicked cell
        const lastClickedRow = parseInt(lastClickedCell.dataset.row);
        const lastClickedCol = parseInt(lastClickedCell.dataset.col);
    
        // Calculate the absolute difference in rows and columns
        const rowDifference = Math.abs(clickedRow - lastClickedRow);
        const colDifference = Math.abs(clickedCol - lastClickedCol);
        
        console.log("Move is valid:");

        // Check if the move is valid (2 horizontally, 2 vertically, or 1 diagonally)
        return (
            (rowDifference === 0 && colDifference === 2) ||  // 2 horizontally
            (rowDifference === 2 && colDifference === 0) ||  // 2 vertically
            (rowDifference === 1 && colDifference === 1)    // 1 diagonally
        );
        
    }
    

    function startGame(startingCell) {
        console.log("Game begins!")
        currentPosition = parseInt(startingCell.textContent, 10);
        startingCell.innerText = numCount;
        startingCell.classList.add('start-cell');
        startingCell.style.backgroundColor = "#ffcc00"
        lastClickedCell = startingCell; // Store the cell reference
        gameStarted = true; // Set gameStarted to true
        
    }
    document.getElementById('restart-btn').addEventListener('click', restartGame);

    function restartGame() {
        // Reset game variables
        currentPosition = null;
        gameStarted = false;
        numCount = 1;
        lastClickedCell = null;
    
        // Reset cell elements
        document.querySelectorAll('.grid-cell').forEach(cell => {
            cell.innerText = '';
            cell.style.backgroundColor = 'white';
            cell.classList.remove('start-cell');
        });
    
        // Display the grid-container
        var gridContainers = document.getElementsByClassName('grid-container');
        for (var i = 0; i < gridContainers.length; i++) {
            gridContainers[i].style.display = 'grid';
        }
    
        // Hide the congratulations message
        var congratulationsElements = document.getElementsByClassName('congratulations');
        for (var i = 0; i < congratulationsElements.length; i++) {
            congratulationsElements[i].style.display = 'none';
        }
    }
});

